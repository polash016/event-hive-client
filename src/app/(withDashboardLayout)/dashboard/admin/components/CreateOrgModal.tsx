import { useCreateOrganizerMutation } from "@/redux/api/organizerApi";
import EHFile from "@/utils/components/Forms/EHFile";
import EHForm from "@/utils/components/Forms/EHForm";
import EHInput from "@/utils/components/Forms/EHInput";
import EHSelect from "@/utils/components/Forms/EHSelect";
import EHModal from "@/utils/components/Shared/EHModal/EHModal";
import modifyPayload from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size should be 5MB or less",
  })
  //   .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
  //     message: "Only JPEG or PNG files are allowed",
  //   })
  .optional();

export const organizerValidation = z.object({
  file: fileSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
  organizer: z.object({
    name: z.string().min(1, "Please enter your name"),
    email: z.string().email("Please enter a valid Email"),
    gender: z.enum(["MALE", "FEMALE", "OTHERS"], {
      errorMap: () => ({ message: "Gender is required" }),
    }),
    contactNumber: z.string().regex(/^\d{11}$/, "Please enter a valid number"),
    address: z.string().optional(),
    organizationName: z.string().min(1, "Please enter your Organization Name"),
    websiteUrl: z.string().optional(),
    socialMediaUrl: z.string().optional(),
  }),
});

export const defaultValues = {
  password: "",
  organizer: {
    name: "",
    email: "",
    gender: "",
    contactNumber: "",
    organizationName: "",
  },
};

const CreateOrgModal = ({ open, setOpen }: IProps) => {
  const [createOrganizer] = useCreateOrganizerMutation();

  const handleLogin = async (data: FieldValues) => {
    const formData = modifyPayload(data);

    const res = createOrganizer(formData).unwrap();

    toast.promise(res, {
      loading: "Creating...",
      success: (res: any) => {
        console.log(res);

        if (res?.id) {
          setOpen(false);
          return res?.message || "Organizer created successfully";
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
    <EHModal open={open} setOpen={setOpen} title="Create Organizer">
      <Box>
        <EHForm
          onSubmit={handleLogin}
          resolver={zodResolver(organizerValidation)}
          defaultValues={defaultValues}
        >
          <Grid
            container
            spacing={4}
            my={1}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item md={4}>
              <EHInput name="organizer.name" label="Name" />
            </Grid>
            <Grid item md={4}>
              <EHInput name="organizer.email" type="email" label="Email" />
            </Grid>
            <Grid item md={4} sm={12}>
              <EHInput
                name="password"
                fullWidth={true}
                type="password"
                label="Password"
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <EHSelect
                name="organizer.gender"
                label="Gender"
                sx={{ width: "100%" }}
                fullWidth={true}
                options={[
                  { label: "Male", value: "MALE" },
                  { label: "FeMale", value: "FEMALE" },
                  { label: "Others", value: "OTHERS" },
                ]}
              />
            </Grid>
            <Grid item md={4}>
              <EHInput name="organizer.contactNumber" label="Contact Number" />
            </Grid>
            <Grid item md={4}>
              <EHFile name="file" label="Upload Image" />
            </Grid>
            <Grid item md={6}>
              <EHInput name="organizer.organizationName" label="Organization" />
            </Grid>
            <Grid item md={6}>
              <EHInput
                name="organizer.websiteUrl"
                label="Website Url"
                required={false}
              />
            </Grid>

            <Grid item md={6}>
              <EHInput
                name="organizer.socialMediaUrl"
                label="Social Media Url"
                required={false}
              />
            </Grid>
            <Grid item md={6}>
              <EHInput
                name="organizer.address"
                label="Address"
                required={false}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            sx={{
              display: "block",
              // px: "60px",
              width: "200px",
              mx: "auto",
              my: 4,
            }}
          >
            Submit
          </Button>
        </EHForm>
      </Box>
    </EHModal>
  );
};
export default CreateOrgModal;
