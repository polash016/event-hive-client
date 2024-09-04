"use client";
import assets from "@/assets";
import { Gender } from "@/constants/common";
import { registerAttendee } from "@/services/actions/registerAttendee";
import EHFile from "@/utils/components/Forms/EHFile";
import EHForm from "@/utils/components/Forms/EHForm";
import EHInput from "@/utils/components/Forms/EHInput";
import EHSelect from "@/utils/components/Forms/EHSelect";
import EHButton from "@/utils/components/ui/EHButton";
import { modifyPayload } from "@/utils/modifyPayload";
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

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size should be 5MB or less",
  })
  .optional();

export const registerValidation = z.object({
  file: fileSchema,
  password: z.string().min(6, "Password must be at least 6 characters"),
  attendee: z.object({
    name: z.string().min(1, "Please enter your name"),
    email: z.string().email("Please enter a valid Email"),
    gender: z.enum(["MALE", "FEMALE", "OTHERS"], {
      errorMap: () => ({ message: "Gender is required" }),
    }),
    contactNumber: z.string().regex(/^\d{11}$/, "Please enter a valid number"),
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

  const handleRegister = async (data: FieldValues) => {
    console.log(data);

    const postData = modifyPayload(data);

    const res = registerAttendee(postData);

    toast.promise(res, {
      loading: "Loading...",
      success: (res: any) => {
        console.log(res);

        if (res?.data?.id) {
          router.push("/login");
          return res.message;
        } else {
          return res.message;
        }
      },
      error: (error: any) => {
        console.log(error.message);
        return error?.message || "Registration failed";
      },
    });
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
                    options={Gender}
                  />
                </Grid>
                <Grid item md={6}>
                  <EHFile label="Upload Photo" name="file" />
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
              <EHButton
                title="Register"
                type="submit"
                sx={{
                  display: "block",
                  mx: "auto",
                  my: 4,
                }}
              />
            </EHForm>
            <Typography component="p">
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "mediumblue",
                }}
              >
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
