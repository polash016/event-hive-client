"use client";
import { Typography, Box, Container, Grid, Paper } from "@mui/material";
import dynamic from "next/dynamic";

const TodayIcon = dynamic(() => import("@mui/icons-material/Today"), {
  ssr: false,
});
const PeopleAltIcon = dynamic(() => import("@mui/icons-material/PeopleAlt"), {
  ssr: false,
});
const TimelineIcon = dynamic(() => import("@mui/icons-material/Timeline"), {
  ssr: false,
});
const features = [
  {
    icon: <TodayIcon />,
    title: "Discover Events",
    description: "Find exciting events in your area",
  },
  {
    icon: <PeopleAltIcon />,
    title: "Connect",
    description: "Meet like-minded people at events",
  },
  {
    icon: <TimelineIcon />,
    title: "Easy Management",
    description: "Effortlessly organize and manage your events",
  },
];

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        About Event Hive
      </Typography>

      <Box my={6}>
        <Typography
          variant="h5"
          align="center"
          //   color="text.secondary"
          paragraph
        >
          Event Hive is your go-to platform for discovering, creating, and
          managing events. We bring people together through shared experiences
          and unforgettable moments.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Join the Hive
        </Typography>
        <Typography variant="body1" align="center" color="white">
          Start exploring events or create your own. The possibilities are
          endless with Event Hive!
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
