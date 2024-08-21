"use client";
import assets from "@/assets";
import { loginUser } from "@/services/actions/loginUser";
import { storeUserInfo } from "@/services/auth.service";
import EHFile from "@/utils/components/Forms/EHFile";
import EHForm from "@/utils/components/Forms/EHForm";
import EHInput from "@/utils/components/Forms/EHInput";
import EHSelect from "@/utils/components/Forms/EHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const loginValidation = z.object({
  email: z.string().email("Please enter a valid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const CreateOrganizer = () => {
  const router = useRouter();

  const handleLogin = async (data: FieldValues) => {
    console.log(data);

    const res = loginUser(data);

    toast.promise(res, {
      loading: "Logging in...",
      success: (res: any) => {
        console.log(res);

        if (res?.data?.accessToken) {
          storeUserInfo(res.data.accessToken);
          router.push("/dashboard");
          return res.message;
        } else {
          return res.message;
        }
      },
      error: (error: any) => {
        console.log(error.message);
        return error?.message || "Login failed";
      },
    });
  };

  return (
    <Container>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Box>
              <Image
                alt="logo"
                src={assets.logo.login_icon}
                width={100}
                height={100}
              ></Image>
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600} color="grey.800">
                Create Organizer
              </Typography>
            </Box>
          </Stack>
          <Box>
            <EHForm
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidation)}
              defaultValues={{
                email: "",
                password: "",
              }}
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
                  <EHInput
                    name="organizer.contactNumber"
                    label="Contact Number"
                  />
                </Grid>
                <Grid item md={4}>
                  <EHFile name="file" label="Upload Image" />
                </Grid>
                <Grid item md={6}>
                  <EHInput
                    name="organizer.organizationName"
                    label="Organization"
                  />
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
        </Box>
      </Stack>
    </Container>
  );
};
export default CreateOrganizer;
