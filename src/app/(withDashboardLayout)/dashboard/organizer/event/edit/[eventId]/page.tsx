"use client";
import { EventType } from "@/constants/common";
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
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { fileSchema } from "../../components/CreateEventModal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetSingleEventQuery,
  useUpdateEventMutation,
} from "@/redux/api/eventApi";
import { toast } from "sonner";

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
  const { data: eventById, isLoading } = useGetSingleEventQuery(eventId);
  const [updateEvent] = useUpdateEventMutation();
  const [eventType, setEventType] = useState("");

  const handleTypeChange = (value: string) => {
    setEventType(value);
    console.log("Selected Type:", eventType);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleCreateEvent = async (values: FieldValues) => {
    const { date, startTime, ...data } = values;
    console.log(date);

    console.log(values);
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

    const formData = modifyEventPayload(data);

    const res = updateEvent({ id: eventId, data: formData }).unwrap();

    toast.promise(res, {
      loading: "Creating...",
      success: (res: any) => {
        console.log(res);
        if (res?.id) {
          return res?.message || "Event created successfully";
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
      type: eventById?.type || "",
      ticketPrice: eventById?.ticketPrice || 0,
    },
    location: {
      street: eventById?.location?.street || "",
      city: eventById?.location?.city || "",
      country: eventById?.location?.country || "",
    },
    artist: {
      name: eventById?.artist?.name || "",
      bio: eventById?.artist?.bio || "",
      genre: eventById?.artist?.genre || "",
    },
    speaker: {
      name: eventById?.speaker?.name || null,
      bio: eventById?.speaker?.bio || null,
      expertise: eventById?.speaker?.expertise || null,
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
            <EHSelect
              name="event.type"
              label="Event Type"
              options={EventType}
              fullWidth={true}
              defaultValue={eventById?.type}
              required={false}
              onChange={handleTypeChange}
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
          {eventById?.type === "CONCERT" ? (
            <>
              <Grid item md={4} sm={6}>
                <EHInput name="artist.name" type="text" label="Artist Name" />
              </Grid>
              <Grid item md={4} sm={6}>
                <EHInput name="artist.bio" type="text" label="Artist Bio" />
              </Grid>
              <Grid item md={4} sm={6}>
                <EHInput
                  name="artist.genre"
                  type="text"
                  label="Artists Genre"
                />
              </Grid>
              <Grid item md={4} sm={6}>
                <EHFile name="artistImg" label="Artist Image" />
              </Grid>
            </>
          ) : eventById?.type === "CONFERENCE" ? (
            <>
              <Grid item md={4} sm={6}>
                <EHInput name="speaker.name" type="text" label="Speaker Name" />
              </Grid>
              <Grid item md={4} sm={6}>
                <EHInput name="speaker.bio" type="text" label="Speaker Bio" />
              </Grid>
              <Grid item md={4} sm={6}>
                <EHInput
                  name="speaker.expertise"
                  type="text"
                  label="Speakers Expertise"
                />
              </Grid>
              <Grid item md={4} sm={6}>
                <EHFile name="speakerImg" label="Speaker Image" />
              </Grid>
            </>
          ) : null}
        </Grid>

        <EHButton
          title="Submit"
          type="submit"
          sx={{
            display: "block",
            // px: "60px",
            width: "200px",
            mx: "auto",
            my: 4,
          }}
        />
      </EHForm>
    </Box>
  );
};
export default EditEvent;
