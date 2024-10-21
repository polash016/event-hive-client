"use client";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import { motion } from "framer-motion";

const HeroContainer = styled(Box)({
  position: "relative",
  height: "90vh",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
});

const BackgroundImage = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url('https://images.pexels.com/photos/4577179/pexels-photo-4577179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "brightness(0.3)",
});

const ContentContainer = styled(Container)({
  position: "relative",
  zIndex: 1,
  textAlign: "center",
  color: "#ffffff",
});

const MotionTypography = motion(Typography);

const AnimatedTypography = styled(motion(MotionTypography))({
  marginBottom: "1rem",
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
});

const AnimatedButton = styled(motion(Button))(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(1, 3),
  background: "linear-gradient(90deg, #f857a6 0%, #ff5858 100%)",
  color: "white",
  "&:hover": {
    background: "linear-gradient(90deg, #ff5858 0%, #f857a6 100%)",
  },
}));

const HeroSection2 = () => {
  return (
    <HeroContainer>
      <BackgroundImage />
      <ContentContainer maxWidth="md">
        <AnimatedTypography
          variant="h2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover Exciting Events
        </AnimatedTypography>
        <AnimatedTypography
          variant="h5"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Connect, Celebrate, and Create Memories
        </AnimatedTypography>
        <Box mt={4}>
          <AnimatedButton
            variant="contained"
            size="large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Explore Events
          </AnimatedButton>
          <AnimatedButton
            variant="outlined"
            size="large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            sx={{ borderColor: "#ffffff", color: "#ffffff" }}
          >
            Create Event
          </AnimatedButton>
        </Box>
      </ContentContainer>
    </HeroContainer>
  );
};

export default HeroSection2;
