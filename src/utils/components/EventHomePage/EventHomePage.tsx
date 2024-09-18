"use client";

import { useGetAllEventQuery } from "@/redux/api/eventApi";
import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";
import EHButton from "../ui/EHButton";
import EventHomeCard from "./EventHomeCard";

const EventHomePage = () => {
  const { data, isLoading } = useGetAllEventQuery({});

  return (
    <Container>
      <Typography variant="h4" my={2} mx="auto" gutterBottom>
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
          data?.data?.map((event: any) => {
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
    </Container>
  );
};
export default EventHomePage;
