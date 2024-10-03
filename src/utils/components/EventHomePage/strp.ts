// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Button as MuiButton,
//   Box,
//   Chip,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import PeopleIcon from "@mui/icons-material/People";
// import Link from "next/link";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";

// // ... (keep all your styled components as they are)

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

// const EventHomeCard = ({ event }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleBuy = async () => {
//     setIsLoading(true);
//     try {
//       // Create a Payment Intent on your backend
//       const response = await axios.post("/api/create-payment-intent", {
//         eventId: event.id,
//         amount: event.price * 100, // Assuming price is in dollars, convert to cents
//         currency: "usd", // Or your preferred currency
//       });

//       const { clientSecret } = response.data;

//       // Load the Stripe.js library
//       const stripe = await stripePromise;

//       // Use Stripe.js to confirm the payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: "Jenny Rosen",
//           },
//         },
//       });

//       if (result.error) {
//         // Show error to your customer
//         console.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           // Payment successful, you can redirect to a success page or update UI
//           console.log("Payment succeeded!");
//         }
//       }
//     } catch (error) {
//       console.error("Error in payment process:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <StyledCard whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
//       {/* ... (keep all your existing JSX) */}
//       <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
//         <MotionButton
//           size="small"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleBuy}
//           disabled={isLoading}
//         >
//           {isLoading ? "Processing..." : "Buy"}
//         </MotionButton>
//         <Link href={`/event/${event.id}`}>
//           <MotionButton
//             size="small"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Details
//           </MotionButton>
//         </Link>
//       </CardActions>
//     </StyledCard>
//   );
// };

// export default EventHomeCard;

// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

// const CheckoutForm = ({ event, onSuccess, onCancel }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState("");
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       const response = await axios.post("/api/create-payment-intent", {
//         eventId: event.id,
//         amount: event.price * 100,
//         currency: "usd",
//       });

//       const { clientSecret } = response.data;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: "Jenny Rosen", // You might want to collect this from the user
//           },
//         },
//       });

//       if (result.error) {
//         setError(result.error.message);
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           onSuccess();
//         }
//       }
//     } catch (error) {
//       setError("An error occurred during the payment process.");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       {error && <div>{error}</div>}
//       <button type="submit" disabled={!stripe || processing}>
//         {processing ? "Processing..." : "Pay"}
//       </button>
//       <button type="button" onClick={onCancel}>
//         Cancel
//       </button>
//     </form>
//   );
// };

// const StripePaymentModal = ({ event, onSuccess, onCancel }) => {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm event={event} onSuccess={onSuccess} onCancel={onCancel} />
//     </Elements>
//   );
// };

// export default StripePaymentModal;

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Button as MuiButton,
//   Box,
//   Chip,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import PeopleIcon from "@mui/icons-material/People";
// import Link from "next/link";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";

// // ... (keep all your styled components as they are)

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// const EventHomeCard = ({ event }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleBuy = async () => {
//     setIsLoading(true);
//     try {
//       // Create a Payment Intent on your backend
//       const response = await axios.post('/api/create-payment-intent', {
//         eventId: event.id,
//         amount: event.price * 100, // Assuming price is in dollars, convert to cents
//         currency: 'usd', // Or your preferred currency
//       });

//       const { clientSecret } = response.data;

//       // Load the Stripe.js library
//       const stripe = await stripePromise;

//       // Use Stripe.js to confirm the payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: 'Jenny Rosen',
//           },
//         }
//       });

//       if (result.error) {
//         // Show error to your customer
//         console.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === 'succeeded') {
//           // Payment successful, you can redirect to a success page or update UI
//           console.log('Payment succeeded!');
//         }
//       }
//     } catch (error) {
//       console.error('Error in payment process:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <StyledCard whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
//       {/* ... (keep all your existing JSX) */}
//       <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
//         <MotionButton
//           size="small"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleBuy}
//           disabled={isLoading}
//         >
//           {isLoading ? "Processing..." : "Buy"}
//         </MotionButton>
//         <Link href={`/event/${event.id}`}>
//           <MotionButton
//             size="small"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Details
//           </MotionButton>
//         </Link>
//       </CardActions>
//     </StyledCard>
//   );
// };

// export default EventHomeCard;
