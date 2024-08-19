"use client";
import assets from "@/assets";
import { registerAttendee } from "@/services/actions/registerAttendee";
import EHForm from "@/utils/components/Forms/EHForm";
import EHInput from "@/utils/components/Forms/EHInput";
import EHSelect from "@/utils/components/Forms/EHSelect";
import modifyPayload from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const registerValidation = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  attendee: z.object({
    name: z.string().min(1, "Please enter your name"),
    email: z.string().email("Please enter a valid Email"),
    gender: z.enum(["MALE", "FEMALE", "OTHERS"], {
      errorMap: () => ({ message: "Gender is required" }),
    }),
    contactNumber: z.string().regex(/^d{11}$/, "Please enter a valid number"),
  }),
});

export const defaultValues = {
  password: "",
  attendee: {
    name: "",
    email: "",
    gender: "",
    contactNumber: "",
  },
};

const Register = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRegister = async (data: FieldValues) => {
    console.log(data);

    const postData = modifyPayload(data, selectedFile);
    console.log(postData);

    try {
      const res = await registerAttendee(postData);

      console.log(res);
      if (res?.data?.id) {
        toast.success(res.message);
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error?.message);
    }
  };

  return (
    <Container
      sx={{
        padding: "50px",
      }}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            bgcolor: "white",
            textAlign: "center",
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
              <Typography variant="h5" fontWeight={600} color="grey.800">
                User Registration
              </Typography>
            </Box>
          </Stack>
          <Box>
            <EHForm
              onSubmit={handleRegister}
              resolver={zodResolver(registerValidation)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <EHInput name="attendee.name" label="Name" />
                </Grid>
                <Grid item md={6}>
                  <EHInput name="attendee.email" label="Email" type="email" />
                </Grid>
                <Grid item md={6}>
                  <EHInput name="password" label="Password" type="password" />
                </Grid>
                <Grid item md={6}>
                  <EHSelect
                    name="attendee.gender"
                    label="Gender"
                    fullWidth={true}
                    options={[
                      { label: "Male", value: "MALE" },
                      { label: "FeMale", value: "FEMALE" },
                      { label: "Others", value: "OTHERS" },
                    ]}
                  />
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth>
                    <Input type="file" hidden onChange={handleFileChange} />
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <EHInput
                    name="attendee.contactNumber"
                    label="Contact"
                    type="tel"
                  />
                </Grid>
                <Grid item md={6}>
                  <EHInput name="attendee.address" label="Address" />
                </Grid>
              </Grid>
              <Button
                type="submit"
                sx={{
                  display: "block",
                  mx: "auto",
                  my: 4,
                }}
              >
                Register
              </Button>
            </EHForm>
            <Typography component="p">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
export default Register;
