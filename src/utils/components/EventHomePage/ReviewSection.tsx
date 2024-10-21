"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  IconButton,
  Container,
} from "@mui/material";
import { FormatQuote as FormatQuoteIcon } from "@mui/icons-material";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Planner",
    content:
      "This platform has revolutionized the way I manage events. It's intuitive, powerful, and saves me hours of work!",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Michael Chen",
    role: "Corporate Events Manager",
    content:
      "I've tried many event management tools, but this one stands out. It's a game-changer for large-scale corporate events.",
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Emily Rodriguez",
    role: "Wedding Coordinator",
    content:
      "The attention to detail in this app is impressive. It's made coordinating weddings a breeze!",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80",
  },
];

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <Box component="section" sx={{ py: 10, px: 2, bgcolor: "grey.900" }}>
      <Box sx={{ width: "90%", mx: "auto" }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            mb: 3,
            textAlign: "center",
            color: "white",
            fontWeight: "semi-bold",
          }}
        >
          What Our Clients Say
        </Typography>
        <Box sx={{ position: "relative", height: 200 }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              style={{ position: "absolute", width: "100%" }}
            >
              <Paper elevation={3} sx={{ p: 3, bgcolor: "grey.800" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ color: "white" }}>
                      {testimonials[currentIndex].name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "indigo.400" }}
                    >
                      {testimonials[currentIndex].role}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <FormatQuoteIcon
                    sx={{ fontSize: 40, color: "indigo.500", mr: 2 }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ color: "grey.300", fontStyle: "italic" }}
                  >
                    {testimonials[currentIndex].content}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </AnimatePresence>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {testimonials.map((_, index) => (
            <IconButton
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 12,
                height: 12,
                mx: 0.5,
                p: 0,
                bgcolor: index === currentIndex ? "indigo.500" : "grey.500",
                "&:hover": {
                  bgcolor: index === currentIndex ? "indigo.600" : "grey.600",
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewSection;
