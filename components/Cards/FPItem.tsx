/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { AddToCart, QuantityHandler } from 'components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IFPProps } from './FPItemReverse';
import Heading from '../Heading';

const FPItem = ({
  imageURL,
  imageName,
  ProductTitle,
  ProductId,
  ShortDescription,
}: IFPProps): JSX.Element => {
  const { inView, ref } = useInView();
  const animationControl = useAnimation();

  if (inView) {
    animationControl.start({
      x: 80,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1.2,
      },
    });
  }

  return (
    <div className="w-screen grid grid-cols-3 text-white my-20 transform -translate-x-48">
      <div className="col-span-2 flex">
        <div className="text-white flex transform rotate-90 justify-start items-center">
          <div className="border-b-2 px-16 mr-3" />
          <Heading level="h4" className="cursor-default w-80">
            {ProductTitle}
          </Heading>
        </div>

        <div className="flex justify-start relative transform -translate-x-36">
          <img src={imageURL} alt={imageName} height={450} width={420} />
          {/* <img
            src="images/Detailline.svg"
            alt="Detailline"
            className="absolute -bottom-10 -right-48"
          /> */}
        </div>
      </div>
      <motion.div
        className="col-span-1 transform translate-x-16 flex flex-col justify-center"
        animate={animationControl}
        initial={{ x: 400, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="pb-12">{ShortDescription}</p>
        <div className="flex h-16 justify-start" ref={ref}>
          <AddToCart
            product={ProductId}
            productName={ProductTitle}
            className="border-white border-2 px-4 py-3 mr-12"
          />
          <QuantityHandler />
        </div>
      </motion.div>
    </div>
  );
};

export default FPItem;
