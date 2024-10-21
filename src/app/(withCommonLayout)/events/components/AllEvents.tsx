"use client";
import { Typography, Grid, Box } from "@mui/material";
import EventHomeCard from "@/utils/components/EventHomePage/EventHomeCard";
import { useGetAllEventQuery } from "@/redux/api/eventApi";

const AllEventsPage = () => {
  const { data, isLoading } = useGetAllEventQuery({});
  return (
    <Box sx={{ width: "80%", mx: "auto", py: 10 }}>
      <Typography
        variant="h3"
        component="h5"
        sx={{ textAlign: "center", color: "white", fontWeight: "semi-bold" }}
        gutterBottom
      >
        All Events
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
    </Box>
  );
};

export default AllEventsPage;
