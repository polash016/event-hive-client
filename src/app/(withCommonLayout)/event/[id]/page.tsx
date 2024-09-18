"use client";
import { useGetSingleEventQuery } from "@/redux/api/eventApi";
import SingleEventDetails from "../components/SingleEventDetails";

const EventDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, isLoading } = useGetSingleEventQuery(id);

  if (isLoading) return <h1>Loading event...</h1>;

  return (
    <div>
      <SingleEventDetails data={data?.data} />
    </div>
  );
};
export default EventDetails;
