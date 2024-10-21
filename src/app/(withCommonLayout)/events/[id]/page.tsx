"use client";
import { useGetSingleEventQuery } from "@/redux/api/eventApi";
import SingleEventDetails from "../components/SingleEventDetails";
import { Box } from "@mui/material";

const EventDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, isLoading } = useGetSingleEventQuery(id);

  if (isLoading) return <h1>Loading event...</h1>;

  return (
    <Box my={6}>
      <SingleEventDetails data={data?.data} />
    </Box>
  );
};
export default EventDetails;
