import { z } from "zod";
import EHModal from "@/utils/components/Shared/EHModal/EHModal";
import { Box, Button, Grid } from "@mui/material";
import EHForm from "@/utils/components/Forms/EHForm";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import EHInput from "@/utils/components/Forms/EHInput";
import EHSelect from "@/utils/components/Forms/EHSelect";
import { IProps } from "../../../admin/components/CreateOrgModal";
import { useCreateEventMutation } from "@/redux/api/eventApi";
import EHDatePicker from "@/utils/components/Forms/EHDatePicker";
import EHTimePicker from "@/utils/components/Forms/EHTimePicker";
import EHFiles from "@/utils/components/Forms/EHFiles";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formateTime";
import EHFullModal from "@/utils/components/Shared/EHModal/EHFullScreenModal";
import { useState } from "react";
import EHFile from "@/utils/components/Forms/EHFile";
import { modifyEventPayload } from "@/utils/modifyPayload";
import EHButton from "@/utils/components/ui/EHButton";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import EHMultipleSelect from "@/utils/components/Forms/EHMultipleSelect";

export const fileSchema =
  typeof window !== "undefined"
    ? z
        .instanceof(File)
        .refine((file) => file.size <= 2 * 1024 * 1024, {
          message: "File size should be 2MB or less",
        })
        .optional()
    : z.any().optional();

export const eventValidation = z.object({
  events: fileSchema,
  artistImg: fileSchema,
  speakerImg: fileSchema,
  event: z.object({
    name: z.string().min(1, "Please enter your name"),
    description: z.string().optional(),
    totalTicket: z.string({ required_error: "Please enter a valid number" }),
    type: z.enum(["CONCERT", "CONFERENCE"], {
      errorMap: () => ({ message: "Event type is required" }),
    }),
    contactNumber: z.string().regex(/^\d{11}$/, "Please enter a valid number"),
    ticketPrice: z.string({ required_error: "Ticket price is required" }),
  }),
  location: z.object({
    street: z.string({ required_error: "Street address is required" }),
    city: z.string({ required_error: "City is required" }),
    country: z.string().default("Bangladesh"),
  }),
  guest: z.object({
    name: z.string({ required_error: "Guest name is required" }),
    bio: z.string({ required_error: "Bio is required" }),
    expertise: z.string({ required_error: "Expertise is required" }),
  }),
  // date: z.string({ required_error: "Date is required" }),
  // startTime: z.string({ required_error: "Time required" }),
});

export const defaultValues = {
  event: {
    name: "",
    description: "",
    totalTicket: "",
    ticketPrice: "",
  },
  location: {
    street: "",
    city: "",
    country: "",
  },
  guest: {
    name: "",
    bio: "",
    expertise: "",
  },
};

const CreateEventModal = ({ open, setOpen }: IProps) => {
  const { data, isLoading } = useGetCategoriesQuery("");
  const [createEvent] = useCreateEventMutation();

  const handleCreateEvent = async (values: FieldValues) => {
    const { date, startTime, ...data } = values;

    console.log({ values });

    const formattedDate = formatDate(date);

    const time = formatTime(startTime);

    data.event.date = formattedDate;

    data.event.startTime = time;

    data.event.totalTicket = Number(data.event.totalTicket);

    data.event.ticketPrice = Number(data.event.ticketPrice);

    const formData = modifyEventPayload(data);

    console.log(data);

    const res = createEvent(formData).unwrap();

    toast.promise(res, {
      loading: "Creating...",
      success: (res: any) => {
        if (res?.data?.id) {
          setOpen(false);
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

  return (
    <EHFullModal open={open} setOpen={setOpen} title="Create Event">
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
              <EHInput name="event.name" label="Event Title" />
            </Grid>
            <Grid item md={4} sm={6}>
              <EHInput
                name="event.description"
                type="text"
                label="Description"
              />
            </Grid>
            <Grid item md={4} sm={6}>
              <EHDatePicker name="date" label="Event Date" />
            </Grid>
            <Grid item md={4} sm={6}>
              <EHTimePicker
                name="startTime"
                fullWidth={true}
                label="Start Time"
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
                isLoading={isLoading}
                data={data?.data}
              />
            </Grid>

            <Grid item md={4} sm={6}>
              <EHInput
                name="location.street"
                type="text"
                label="Event Address"
              />
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
            sx={{
              display: "flex",
              justifyContent: "center",
              // px: "60px",
              width: "200px",
              mx: "auto",
              my: 4,
            }}
          />
        </EHForm>
      </Box>
    </EHFullModal>
  );
};
export default CreateEventModal;
