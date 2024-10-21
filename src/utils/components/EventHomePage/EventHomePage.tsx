"use client";

import { useGetAllEventQuery } from "@/redux/api/eventApi";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import EHButton from "../ui/EHButton";
import EventHomeCard from "./EventHomeCard";

const EventHomePage = () => {
  const { data, isLoading } = useGetAllEventQuery({});

  return (
    <Box sx={{ width: "80%", mx: "auto", py: 10 }}>
      <Typography
        variant="h3"
        component="h5"
        sx={{ textAlign: "center", color: "white", fontWeight: "semi-bold" }}
        gutterBottom
      >
        Exciting Events
      </Typography>
      <Grid
        container
        spacing={4}
        my={1}
        alignItems="center"
        justifyContent="start"
      >
        {!isLoading ? (
          data?.data?.slice(0, 6).map((event: any) => {
            return (
              <Grid key={event.id} item sm={6} md={6} lg={4}>
                <EventHomeCard event={event} />
              </Grid>
            );
          })
        ) : (
          // <CircularProgress color="success" />
          <h1>Loading.....</h1>
        )}
      </Grid>

      {!isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
          }}
        >
          <Button
            component="a"
            href="/events"
            sx={{
              px: 8,
              backgroundColor: "rgba(90, 90, 90, 0.2)",
              py: 1.5,
              transition: "all 0.3s ease",
              ":hover": {
                backgroundColor: "rgba(90, 90, 90, 0.5)",
                transform: "scale(1.05)",
              },
            }}
          >
            See All
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default EventHomePage;
