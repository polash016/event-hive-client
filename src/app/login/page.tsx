"use client";
import assets from "@/assets";
import { loginUser } from "@/services/actions/loginUser";
import { storeUserInfo } from "@/services/auth.service";
import EHForm from "@/utils/components/Forms/EHForm";
import EHInput from "@/utils/components/Forms/EHInput";
import EHButton from "@/utils/components/ui/EHButton";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import GoogleIcon from "@mui/icons-material/Google";
import { z } from "zod";

const loginValidation = z.object({
  email: z.string().email("Please enter a valid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const router = useRouter();

  const handleLogin = async (data: FieldValues) => {
    console.log(data);

    try {
      const res = await loginUser(data);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo(res?.data?.accessToken);
        router.push("/dashboard");
      } else {
        // setError(res.message);
        console.log(res);
      }
    } catch (err: any) {
      console.error(err.message);
    }

    // toast.promise(res, {
    //   loading: "Logging in...",
    //   success: (res: any) => {
    //     console.log(res);

    //     if (res?.data?.accessToken) {
    //       storeUserInfo(res.data.accessToken);
    //       // router.push("/dashboard");
    //       return res.message;
    //     } else {
    //       return res.message;
    //     }
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //     return error?.message || "Login failed";
    //   },
    // });
  };
  const handleGoogleLogin = async () => {
    if (typeof window !== "undefined") {
      window.location.href =
        "https://event-hive-two.vercel.app/api/v1/auth/google";
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
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidation)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid
                container
                spacing={2}
                my={1}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item md={8}>
                  <EHInput name="email" label="Email" type="email" />
                </Grid>
                <Grid item md={8}>
                  <EHInput name="password" type="password" label="Password" />
                </Grid>
              </Grid>
              <Typography textAlign="center" component="p">
                Forgot Password?
              </Typography>
              <EHButton
                title="Login"
                type="submit"
                sx={{
                  display: "block",
                  mx: "auto",
                  my: 4,
                }}
              />
            </EHForm>

            <Box sx={{ my: 4 }}>
              <IconButton onClick={() => handleGoogleLogin()}>
                <GoogleIcon
                  color="info"
                  sx={{ width: "40px", height: "40px" }}
                />
              </IconButton>
            </Box>

            <Typography component="p">
              Need an account?{" "}
              <Link
                href="/register"
                style={{
                  color: "mediumblue",
                }}
              >
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
export default Login;
