"use client";

import WrappedEventDetails from "../../components/BuyEvent";

const Payment = ({ params }: { params: { id: string } }) => {
  console.log(params);
  return <WrappedEventDetails id={params.id}></WrappedEventDetails>;
};

export default Payment;
