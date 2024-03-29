/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// Square payments api
import { squareClient } from 'lib/SquareClient';
import { ApiError, CreatePaymentRequest, Money } from 'square';
import { v4 as uuidv4 } from 'uuid';
import JSONBig from 'json-bigint';

const idempotencyKey = uuidv4();

const { paymentsApi } = squareClient;
// const LID = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_LID;

// For updating the codeuse big int literal n, but since it is targeting lower than 2020 use BIgInt()
export const handler = async (
  req: {
    body: { token?: any; amount?: any; orderId?: any; referenceId?: any };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: any): { (): any; new (): any; end: { (): void; new (): any } };
        new (): any;
      };
    };
    json: (arg0: any) => void;
  },
) => {
  const { token } = req.body;
  const { amount } = req.body;
  const { orderId } = req.body;
  const { referenceId } = req.body;
  const reqBodyMoney: Money = {};
  // $2.00 in cents 200
  reqBodyMoney.amount = BigInt(amount);
  reqBodyMoney.currency = 'USD';

  // Retrieve order Id from woo, and source ID from Web Payments SDK, customerID
  const body: CreatePaymentRequest = {
    sourceId: token,
    idempotencyKey,
    amountMoney: reqBodyMoney,
    // Refrence the orderID created in square
    orderId,
    referenceId,
    locationId: '3R5GR5D9RKG4Z', //  L1MBBAVEE0STC 3R5GR5D9RKG4Z
  };
  // If we save cards on file with create customer API
  // body.customerId = '';

  // Woo-comerce orderID
  body.referenceId = 'paymentsSDK';

  try {
    const {
      result: { payment },
    } = await paymentsApi.createPayment(body);
    const json = JSONBig.parse(JSONBig.stringify(payment));
    res.status(200).json(json).end();
    // console.log(payment);
    // res.status(200).end();
  } catch (error) {
    if (error instanceof ApiError) {
      const errors = error.result;
      res.json(errors);
      // const { statusCode } = error;
      // console.log(statusCode);
    }
  }
};

export default handler;
