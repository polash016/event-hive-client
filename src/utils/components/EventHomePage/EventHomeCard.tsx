import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button as MuiButton,
  Box,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { useInitPaymentMutation } from "@/redux/api/paymentApi";

const StyledCard = styled(motion(Card))(({ theme }) => ({
  maxWidth: 400,
  margin: "20px auto",
  transition: "0.3s",
  minWidth: 300,
  backgroundColor: "rgba(90, 90, 90, 0.2)",
  color: "#ffffff", // Equivalent of text-card-foreground
  borderRadius: theme.shape.borderRadius * 2,
  padding: 20,
  border: "1px solid #333", // Equivalent of border
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Equivalent of shadow-sm
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
  },
}));

const CardContentArea = styled(CardContent)({
  padding: "16px 24px",
});

const EventImage = styled(Box)({
  position: "relative",
  height: 200,
  overflow: "hidden",
});

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const StyledButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: "#3a506b",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#5b7193",
  },
  transition: "background-color 0.3s",
}));

const MotionButton = motion(StyledButton);

const EventHomeCard = ({ event }: { event: any }) => {
  const [initPayment] = useInitPaymentMutation();
  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Q0VGlEMhjSajFzMD80TZXJ31R1xaLCSJKgZ1yrFL5NidJFyio2kmjbTV0tlCQrUfrfV3XR8R4TLPddzGUHnVI7s005umFAjgX"
    );
    const paymentIntent = await initPayment(event.id);
    console.log(paymentIntent);
    const result = await stripe?.redirectToCheckout({
      sessionId: paymentIntent.data.id,
    });
    // console.log({ result });
    if (result?.error) {
      console.log(result.error);
    }
  };
  return (
    <StyledCard
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      sx={{ height: "500px" }}
    >
      <EventImage>
        <Image
          src={event.images[0].imageUrl}
          alt={event.name}
          layout="fill"
          objectFit="cover"
        />
      </EventImage>
      <CardContentArea>
        <Typography gutterBottom variant="h5" component="div" color="primary">
          {event.name}
        </Typography>
        <InfoItem>
          <CalendarTodayIcon
            fontSize="small"
            sx={{ mr: 1, color: "#bbbbbb" }}
          />
          <Typography variant="body2" color="#bbbbbb">
            {new Date(event.dateTime).toLocaleDateString()}
          </Typography>
        </InfoItem>
        <InfoItem>
          <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: "#bbbbbb" }} />
          <Typography variant="body2" color="#bbbbbb">
            Starts at {new Date(event.dateTime).toLocaleTimeString()}
          </Typography>
        </InfoItem>
        <InfoItem>
          <LocationOnIcon fontSize="small" sx={{ mr: 1, color: "#bbbbbb" }} />
          <Typography variant="body2" color="#bbbbbb">
            {event.location.city}, {event.location.country}
          </Typography>
        </InfoItem>
        <InfoItem>
          <PeopleIcon fontSize="small" sx={{ mr: 1, color: "#bbbbbb" }} />
          <Typography variant="body2" color="#bbbbbb">
            {event.ticketSold} going
          </Typography>
        </InfoItem>
        {/* <Typography variant="body2" color="#bbbbbb">
          Guest: {event.guest.name}
        </Typography>
        <Box mt={1}>
          {event.categories.slice(0, 2).map((cat: any) => (
            <EventChip
              key={cat.categoryId}
              label={cat.category.name}
              size="small"
            />
          ))}
        </Box> */}
      </CardContentArea>
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Typography component="a" href={`/events/payment/${event.id}`}>
          <MotionButton
            size="small"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Buy
          </MotionButton>
        </Typography>
        <Link href={`/events/${event.id}`}>
          <MotionButton
            size="small"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Details
          </MotionButton>
        </Link>
      </CardActions>
    </StyledCard>
  );
};

export default EventHomeCard;
