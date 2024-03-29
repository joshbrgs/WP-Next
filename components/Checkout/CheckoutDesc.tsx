/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-one-expression-per-line */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { toastConfig } from 'components/ToastConfig';
import { toast } from 'react-toastify';
import { APPLY_COUPON, REMOVE_COUPONS } from 'graphql/Mutations';
import { GET_CART_QUERY } from 'graphql/Queries/Cart';
import { getFormattedCart } from 'helpers/functions';
import { CartContext } from 'Context/CartContext';
import { Loading } from 'components';

interface IProps {
  subTotal?: number | any;
  disabled?: boolean;
}

// Loading signal

const CheckoutDesc = ({ subTotal, disabled = true }: IProps): JSX.Element => {
  let input: HTMLInputElement;
  const [cart, setCart] = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const { data, refetch } = useQuery(GET_CART_QUERY, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  const coupon = cart?.discountCode;

  // Apply Coupon
  const [applyCoupon, { data: couponRes, loading, error }] = useMutation(
    APPLY_COUPON,
    {
      onCompleted: () => {
        // On Success:
        // Make the GET_CART query to update the cart with new values in React context.
        refetch();
        const updatedCart = getFormattedCart(data);
        localStorage.setItem('woo-cart', JSON.stringify(updatedCart));

        // Update cart data in React Context.
        setCart(updatedCart);
      },
      onError: () => {
        if (error) {
          toast.error(error?.graphQLErrors?.[0]?.message ?? '', toastConfig);
        }
      },
    },
  );

  // Remove Coupon
  const [
    removeCoupon,
    {
      data: couponRemoved,
      error: couponRemovalError,
      loading: couponRemovalLoading,
    },
  ] = useMutation(REMOVE_COUPONS, {
    variables: {
      code: cart?.discountCode,
    },
    onCompleted: () => {
      // On Success:
      // Make the GET_CART query to update the cart with new values in React context.
      refetch();
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
    onError: () => {
      if (couponRemovalError) {
        toast.error(
          couponRemovalError?.graphQLErrors?.[0]?.message ?? '',
          toastConfig,
        );
      }
    },
  });

  const handleDiscount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await applyCoupon({ variables: { code: input.value } });
    setAdded(true);
  };

  useEffect(() => {
    if (coupon && added) {
      toast.success(
        `🦄 ${coupon} applied for ${cart?.discountAmount} off!`,
        toastConfig,
      );
    }
  }, [coupon, added, cart?.discountAmount]);

  if (error) {
    toast.error(error?.graphQLErrors?.[0]?.message ?? '', toastConfig);
  }

  const handleDelete = async () => {
    await removeCoupon();
    toast.success(`Coupon succesfully Removed`, toastConfig);
  };

  return (
    <div className="flex flex-col justify-start">
      {!coupon ? (
        <form onSubmit={(event) => handleDiscount(event)} className="my-2">
          {loading || couponRemovalLoading ? (
            <div className="flex ">
              <p className="pl-3 pr-6 py-1 w-4/6 bg-white text-gray-300 text-base">
                Applying...
              </p>
              <button
                type="submit"
                className="bg-gray-400 px-2 rounded-r-lg"
                disabled={loading}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          ) : (
            <>
              <input
                placeholder="Discount Code"
                name="discount"
                defaultValue=""
                ref={(node) => {
                  input = node;
                }}
                className={`${
                  error ? 'border-red-500 outline-none' : 'outline-none'
                } px-1 w-4/6`}
              />
              <button
                type="submit"
                className="bg-gray-400 px-2 rounded-r-lg"
                disabled={loading}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </>
          )}
        </form>
      ) : (
        <p className="bg-gray-400 rounded px-2 ml-2 w-full my-2 flex justify-center relative">
          {couponRemovalLoading ? (
            <>Removing...</>
          ) : (
            <>
              <span className="font-semibold px-4">{cart.discountCode}</span>
              <span>-{cart.discountAmount}</span>
            </>
          )}
          <button
            disabled={couponRemovalLoading}
            type="button"
            className="rounded-l-xl bg-black text-white cursor-pointer absolute -left-2 px-1.5"
            onClick={() => handleDelete()}
          >
            X
          </button>
        </p>
      )}

      <p>SubTotal:</p>
      {subTotal ? (
        <p>
          {typeof subTotal !== 'string' ? `$${subTotal?.toFixed(2)}` : subTotal}
        </p>
      ) : (
        <p>$0.00</p>
      )}
      <button
        type="button"
        disabled={disabled || loading}
        className={`${
          disabled && 'hidden'
        } text-white font-mont text-xl bg-black border-white border-2 px-10 py-1 hover:bg-white hover:border-black hover:text-black cursor-pointer`}
      >
        <Link href="/checkout">Checkout</Link>
      </button>
    </div>
  );
};

export default CheckoutDesc;
