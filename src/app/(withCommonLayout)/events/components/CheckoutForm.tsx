import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "./Checkout.css";
import { getUserInfo } from "@/services/auth.service";
import { toast } from "sonner";
import { ISuccessResponse } from "@/types";
import { useRouter } from "next/navigation";

const CheckoutForm = ({ id }: { id: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const userInfo = getUserInfo();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_EVENT_HIVE_API_URL}/payment/create-checkout-session`,
        { eventId: id }
      );
      console.log("api response", response);
      setClientSecret(response.data.client_secret);
    };
    if (id) {
      fetchClientSecret();
    }
  }, [id]);
  if (!stripe || !elements || !clientSecret) {
    console.log("stripe error");
    return <div className="text-white">Loading payment form...</div>;
  }
  console.log("client secret", clientSecret);

  console.log("stripe", stripe);

  console.log("elements", elements);

  const handlePayment = async () => {
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message as string);
    } else {
      console.log("paymentMethod", paymentMethod);
      setCardError("");
    }

    setProcessing(true);
    setSuccess("");
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(
        clientSecret,

        {
          payment_method: {
            card: card,
            billing_details: {
              email: userInfo.email,
            },
          },
        }
      );
    if (confirmError) {
      setCardError(confirmError?.message as string);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      console.log("payment success", paymentIntent);
      setTransactionId(paymentIntent?.client_secret as string);
      const successPayload = {
        eventId: id,
        transactionId: paymentIntent?.client_secret as string,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        paymentMethod: "card",
        paymentStatus: "success",
        paymentGatewayData: paymentIntent,
      };

      const completePayment: ISuccessResponse = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_EVENT_HIVE_API_URL}/payment/payment-success`,
        successPayload
      );

      console.log("completePayment", completePayment);
      if (completePayment.data.id) {
        toast.success(completePayment.message || "");
        setProcessing(false);
        setIsLoading(false);
        router.push("/");
        return;
      }
    }

    // save payment info in the database
    //   fetch(`https://computer-zone-server.vercel.app/payments`, {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //       authorization: `bearer ${localStorage.getItem("access-token")}`,
    //     },
    //     body: JSON.stringify(paymentInfo),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.insertedId) {
    //         setSuccess("Congrats! your payment has been success");
    //         toast.success("Congrats! your payment has been success");
    //         setTransactionId(paymentIntent.id);
    //       }
    //     });
  };

  return (
    <form
      id="payment-form"
      className="form w-full mt-20 my-auto "
      onSubmit={(e) => {
        e.preventDefault();
        handlePayment();
      }}
    >
      <CardElement
        id="payment-element"
        options={{
          style: {
            base: {
              fontSize: "18px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="payment-button"
        type="submit"
        disabled={
          isLoading || !stripe || !elements || !clientSecret || processing
        }
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      <>
        {cardError && (
          <p id="payment-message" className="text-red-600 mt-3 font-medium">
            {cardError}
          </p>
        )}
        <div>
          {processing ? (
            <div>Loading...</div>
          ) : (
            <>
              {transactionId && (
                <>
                  <p className="text-green-500 font-medium">{success}</p>
                  <p className="font-medium text-xl text-gray-300">
                    Your Transaction Id is:{" "}
                    <span className="font-bold">{transactionId}</span>{" "}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </>
    </form>
  );
};

export default CheckoutForm;
