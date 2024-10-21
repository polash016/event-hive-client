"use server";
import { FieldValues } from "react-hook-form";
import setAccessToken from "@/helpers/setAccessToken";

export const loginUser = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `https://event-hive-two.vercel.app/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        // cache: "no-store",
        credentials: "include",
      }
    );

    const user = await res.json();

    if (user.data.accessToken) {
      setAccessToken(user.data.accessToken);
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};
