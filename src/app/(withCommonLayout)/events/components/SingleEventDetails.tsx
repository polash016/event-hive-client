import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";
import ImageSlider from "@/utils/components/Dashboard/ImageSlider/ImageSlider";
import { motion } from "framer-motion";
import { useInitPaymentMutation } from "@/redux/api/paymentApi";
import { useRouter } from "next/navigation";
import WrappedEventDetails from "./BuyEvent";

const ImageSliderPlaceholder = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "300px",
  position: "relative",
  borderRadius: "10px",
  overflow: "hidden",
  marginBottom: theme.spacing(3),
}));

const GuestCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: "linear-gradient(145deg, #e6e6e6, #4d4d4d)",
  borderRadius: "10px",
  boxShadow: "1px 5px 5px #d2d2d2, -5px -5px 15px #4d4d4d",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#3a506b",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#5b7193",
  },
  // padding: "5px 20px 5px 20px",
  width: "100px",
  transition: "background-color 0.3s",
}));

const MotionButton = motion(StyledButton);

const SingleEventDetails = ({ data }: { data: any }) => {
  const router = useRouter();
  const [initPayment] = useInitPaymentMutation();
  const {
    id,
    name,
    description,
    dateTime,
    ticketPrice,
    totalTicket,
    ticketSold,
    status,
    images,
    location,
    guest,
    categories,
  } = data;

  const hasEventFinished = new Date(dateTime) < new Date();

  const handlePayment = async () => {
    const response = await initPayment(id).unwrap();
    console.log(response);
    if (response.data.paymentUrl) {
      router.push(response.data.paymentUrl);
    }
  };

  return (
    <Box
      component={motion.div}
      sx={{
        maxWidth: 1000,
        margin: "auto",
        padding: 3,
        height: 1000,
        backgroundColor: "#333333",
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        {data.name}
      </Typography>

      <ImageSliderPlaceholder>
        {data.images && data.images.length > 0 ? (
          <Box
            sx={{
              mb: 4,
              width: "100%",
              height: "100%",
              borderRadius: 2,
              overflow: "hidden",
            }}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
          >
            <ImageSlider images={images} />
          </Box>
        ) : (
          <Typography variant="h6">No image available</Typography>
        )}
      </ImageSliderPlaceholder>

      <Grid container spacing={3}>
        {/* Date & Status */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: "#c0c0c0" }}>
            <strong>Date:</strong> {new Date(dateTime).toLocaleDateString()}
            <Chip
              label={hasEventFinished ? "ENDED" : status}
              color={status === "UPCOMING" ? "error" : "warning"}
              variant="outlined"
              sx={{
                color: "#ffffff",
                borderColor: "#ffffff",
                boxShadow: "8px 4px 8px rgba(0, 0, 0, 0.5)",
                ml: 2,
              }}
            />
          </Typography>
        </Grid>

        {/* Ticket Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ color: "#c0c0c0" }}>
            <strong>Ticket Price:</strong> ${ticketPrice}
          </Typography>
          <Typography variant="body1" sx={{ color: "#c0c0c0" }}>
            <strong>Total Tickets:</strong> {totalTicket}
          </Typography>
          <Typography variant="body1" sx={{ color: "#c0c0c0" }}>
            <strong>Tickets Sold:</strong> {ticketSold}
          </Typography>
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#c0c0c0" }}
          >
            {description || "No description provided."}
          </Typography>
        </Grid>

        {/* Location */}
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: "#c0c0c0" }}>
            <strong>Location:</strong> {location.street}, {location.city},{" "}
            {location.country}
          </Typography>
        </Grid>

        {/* Categories */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {categories.map((cat: any) => (
              <Chip
                key={cat.category.id}
                label={cat.category.name}
                variant="outlined"
                color="warning"
                sx={{
                  boxShadow: "8px 4px 8px rgba(0, 0, 0, 0.5)",
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* Guest Information */}
        <Grid item xs={12}>
          <GuestCard elevation={3}>
            <Typography variant="h5" gutterBottom>
              Guest
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                {guest?.imageUrl ? (
                  <Image src={guest.imageUrl} alt={guest.name} layout="fill" />
                ) : (
                  data.guest.name.charAt(0)
                )}
              </Avatar>
              <Typography variant="h6">{guest.name}</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              {data.guest.bio}
            </Typography>
            <Typography variant="body2">
              Expertise: {guest.expertise}
            </Typography>
          </GuestCard>
        </Grid>
      </Grid>

      {/* <Typography sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <MotionButton
          size="small"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Buy
        </MotionButton>
      </Typography> */}

      <Typography component="a" href={`/events/payment/${id}`}>
        {/* <WrappedEventDetails id={id}></WrappedEventDetails> */}

        <Button>Buy</Button>
      </Typography>
    </Box>
  );
};

export default SingleEventDetails;

{
  /* <Typography component="a" href={`/events/payment/${id}`}>
        {/* <WrappedEventDetails id={id}></WrappedEventDetails> */
}
//   <Button>Buy</Button>
// </Typography> */}
