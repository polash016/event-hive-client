import { z } from "zod";
import { IProps } from "../../components/CreateOrgModal";
import EHModal from "@/utils/components/Shared/EHModal/EHModal";
import { Box, Button, Grid } from "@mui/material";
import EHForm from "@/utils/components/Forms/EHForm";
import { FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { useCreateAdminMutation } from "@/redux/api/adminApi";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import EHInput from "@/utils/components/Forms/EHInput";
import EHSelect from "@/utils/components/Forms/EHSelect";
import EHFile from "@/utils/components/Forms/EHFile";
import { Gender } from "@/constants/common";
import EHButton from "@/utils/components/ui/EHButton";

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
  admin: z.object({
    name: z.string().min(1, "Please enter your name"),
    email: z.string().email("Please enter a valid Email"),
    gender: z.enum(["MALE", "FEMALE", "OTHERS"], {
      errorMap: () => ({ message: "Gender is required" }),
    }),
    contactNumber: z.string().regex(/^\d{11}$/, "Please enter a valid number"),
    address: z.string().optional(),
  }),
});

export const defaultValues = {
  password: "",
  admin: {
    name: "",
    email: "",
    gender: "",
    contactNumber: "",
  },
};

const CreateAdminModal = ({ open, setOpen }: IProps) => {
  const [createAdmin] = useCreateAdminMutation();

  const handleCreateOrg = async (data: FieldValues) => {
    const formData = modifyPayload(data);

    const res = createAdmin(formData);

    toast.promise(res, {
      loading: "Creating...",
      success: (res: any) => {
        if (res?.data?.id) {
          setOpen(false);

          return res?.message || "Admin created successfully";
        } else {
          console.log(res);
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
    <EHModal open={open} setOpen={setOpen} title="Create Admin">
      <Box>
        <EHForm
          onSubmit={handleCreateOrg}
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
              <EHInput name="admin.name" label="Name" />
            </Grid>
            <Grid item md={4}>
              <EHInput name="admin.email" type="email" label="Email" />
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
                name="admin.gender"
                label="Gender"
                sx={{ width: "100%" }}
                fullWidth={true}
                options={Gender}
              />
            </Grid>
            <Grid item md={4}>
              <EHInput name="admin.contactNumber" label="Contact Number" />
            </Grid>
            <Grid item md={4}>
              <EHFile name="file" label="Upload Image" />
            </Grid>

            <Grid item md={6}>
              <EHInput name="admin.address" label="Address" required={false} />
            </Grid>
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
    </EHModal>
  );
};
export default CreateAdminModal;
