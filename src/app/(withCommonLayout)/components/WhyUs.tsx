"use client";

import { motion } from "framer-motion";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Bolt, CalendarToday, People } from "@mui/icons-material";

const WhyChooseUs = () => (
  <Box
    component={motion.section}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    sx={{
      py: 8,
      px: 2,
      background: "linear-gradient(to bottom, #1a202c, #000000)",
    }}
  >
    <Box sx={{ width: "90%", mx: "auto" }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 6,
          textAlign: "center",
          color: "white",
          fontWeight: "semi-bold",
        }}
      >
        Powerful Features for Seamless Event Management
      </Typography>
      <Grid container spacing={4}>
        {[
          {
            Icon: CalendarToday,
            title: "Easy Scheduling",
            description:
              "Effortlessly manage your event timeline with our intuitive scheduling tools.",
          },
          {
            Icon: People,
            title: "Attendee Management",
            description:
              "Keep track of your guests with powerful attendee management features.",
          },
          {
            Icon: Bolt,
            title: "Real-time Updates",
            description:
              "Stay on top of your event with instant notifications and real-time updates.",
          },
        ].map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Paper
                elevation={3}
                sx={{ p: 4, height: "100%", bgcolor: "grey.800" }}
              >
                <card.Icon sx={{ fontSize: 48, color: "indigo.400", mb: 2 }} />
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ mb: 2, color: "white", fontWeight: "bold" }}
                >
                  {card.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "grey.300" }}>
                  {card.description}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

export default WhyChooseUs;
