"use client";
import setAccessToken from "@/helpers/setAccessToken";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    // Extract the user data from URL query parameters
    const params = new URLSearchParams(window.location.search);

    console.log(params);

    const accessToken = params.get("accessToken");
    const error = params.get("error");

    if (accessToken) {
      storeUserInfo(accessToken);
      console.log("User logged in successfully:", accessToken);
      setAccessToken(accessToken, { redirect: "/" });
    } else if (error) {
      // Handle the error case
      console.error("Error during login:", error);
      router.push("/login");
    }
  }, [router]);

  return <div>Logging in...</div>;
};

export default LoginSuccess;
