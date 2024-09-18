"use client";
import EHDatePicker from "@/utils/components/Forms/EHDatePicker";
import EHFile from "@/utils/components/Forms/EHFile";
import EHFiles from "@/utils/components/Forms/EHFiles";
import EHForm from "@/utils/components/Forms/EHForm";
import EHInput from "@/utils/components/Forms/EHInput";
import EHSelect from "@/utils/components/Forms/EHSelect";
import EHTimePicker from "@/utils/components/Forms/EHTimePicker";
import EHButton from "@/utils/components/ui/EHButton";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formateTime";
import { modifyEventPayload } from "@/utils/modifyPayload";
import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { fileSchema } from "../../components/CreateEventModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetSingleEventQuery,
  useUpdateEventMutation,
} from "@/redux/api/eventApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import EHMultipleSelect from "@/utils/components/Forms/EHMultipleSelect";

interface IParams {
  params: {
    eventId: string;
  };
}

export const eventValidation = z.object({
  events: fileSchema,
  artistImg: fileSchema,
  speakerImg: fileSchema,
  event: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    totalTicket: z.string().optional(),
    type: z.enum(["CONCERT", "CONFERENCE"]).optional(),
    contactNumber: z.string().optional(),
    ticketPrice: z.string().optional(),
  }),
  location: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  }),
  artist: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    genre: z.string().optional(),
  }),
  speaker: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    expertise: z.string().optional(),
  }),
});

const EditEvent = ({ params }: IParams) => {
  const { eventId } = params;
  const router = useRouter();
  const { data: singleEvent, isLoading: getEventLoading } =
    useGetSingleEventQuery(eventId);
  const { data, isLoading: categoryLoading } = useGetCategoriesQuery("");
  const [updateEvent, isLoading] = useUpdateEventMutation();

  if (getEventLoading) {
    return <div>Loading...</div>;
  }

  const eventById = singleEvent?.data;

  console.log(eventById);

  const handleCreateEvent = async (values: FieldValues) => {
    const { date, startTime, ...data } = values;

    const formattedDate =
      date !== Date.now() ? formatDate(date) : formatDate(eventById?.dateTime);
    const time = startTime
      ? formatTime(startTime)
      : formatTime(eventById?.dateTime);

    data.event.date = formattedDate;

    data.event.startTime = time;

    if (data.event.totalTicket)
      data.event.totalTicket = Number(data.event.totalTicket);

    if (data.event.ticketPrice)
      data.event.ticketPrice = Number(data.event.ticketPrice);

    console.log(data);
    const formData = modifyEventPayload(data);

    const res = updateEvent({ id: eventId, data: formData }).unwrap();

    toast.promise(res, {
      loading: "Creating...",
      success: (res: any) => {
        console.log(res);
        if (res?.data?.id) {
          router.push("/dashboard/organizer/event");
          return res.message || "Event updated successfully";
        } else {
          return res?.message;
        }
      },
      error: (error: any) => {
        console.log(error.message);
        return error?.message || "Something went wrong";
      },
    });
  };

  //   const date = formatDate(eventId?.dateTime as string);

  const defaultValues = {
    event: {
      name: eventById?.name || "",
      description: eventById?.description || "",
      totalTicket: eventById?.totalTicket || 0,
      ticketPrice: eventById?.ticketPrice || 0,
    },
    location: {
      street: eventById?.location?.street || "",
      city: eventById?.location?.city || "",
      country: eventById?.location?.country || "",
    },
    guest: {
      name: eventById?.guest?.name || null,
      bio: eventById?.guest?.bio || null,
      expertise: eventById?.guest?.expertise || null,
    },
  };

  return (
    <Box>
      <EHForm
        onSubmit={handleCreateEvent}
        // resolver={zodResolver(eventValidation)}
        defaultValues={defaultValues}
      >
        <Grid
          container
          spacing={4}
          my={1}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item md={4} sm={6}>
            <EHInput name="event.name" label="Event Title" required={false} />
          </Grid>
          <Grid item md={4} sm={6}>
            <EHInput name="event.description" type="text" label="Description" />
          </Grid>
          <Grid item md={4} sm={6}>
            <EHDatePicker
              name="date"
              label="Event Date"
              defaultValue={eventById?.dateTime}
            />
          </Grid>
          <Grid item md={4} sm={6}>
            <EHTimePicker
              name="startTime"
              fullWidth={true}
              label="Start Time"
              defaultValue={eventById?.dateTime}
            />
          </Grid>
          <Grid item md={4} sm={6}>
            <EHInput
              name="event.totalTicket"
              fullWidth={true}
              type="number"
              label="Total Ticket"
            />
          </Grid>
          <Grid item md={4} sm={6}>
            <EHInput
              name="event.ticketPrice"
              fullWidth={true}
              type="number"
              label="Ticket Price"
            />
          </Grid>

          <Grid item md={4} sm={6}>
            {/* <EHFile name="events" label="Upload Images" /> */}

            <EHFiles name="events" label="Upload Images" />
          </Grid>

          <Grid item md={4} sm={6}>
            <EHMultipleSelect
              name="categories"
              label="Event Categories"
              isLoading={categoryLoading}
              data={data?.data}
            />
          </Grid>

          <Grid item md={4} sm={6}>
            <EHInput name="location.street" type="text" label="Event Address" />
          </Grid>

          <Grid item md={4} sm={6}>
            <EHInput name="location.city" type="text" label="City" />
          </Grid>

          <Grid item md={4} sm={6}>
            <EHInput name="location.country" type="text" label="Country" />
          </Grid>

          <Grid item md={4} sm={6}>
            <EHInput name="guest.name" type="text" label="Guest Name" />
          </Grid>
          <Grid item md={4} sm={6}>
            <EHInput name="guest.bio" type="text" label="Guest Bio" />
          </Grid>
          <Grid item md={4} sm={6}>
            <EHInput
              name="guest.expertise"
              type="text"
              label="Guest's Expertise"
            />
          </Grid>
          <Grid item md={4} sm={6}>
            <EHFile name="guestImg" label="Guest Image" />
          </Grid>
        </Grid>

        <EHButton
          icon={true}
          title="Submit"
          type="submit"
          disabled={!isLoading}
          sx={{
            display: "flex",
            justifyContent: "center",
            // px: "60px",
            width: "150px",
            mx: "auto",
            my: 4,
          }}
        />
      </EHForm>
    </Box>
  );
};
export default EditEvent;
