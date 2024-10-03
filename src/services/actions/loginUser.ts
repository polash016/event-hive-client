"use server";
import { envVariable } from "@/config";
import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { authKey } from "@/constants/authKey";
import { redirect } from "next/navigation";

export const loginUser = async (payload: FieldValues) => {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      // cache: "no-store",
      credentials: "include",
    });

    const user = await res.json();

    if (user.data.accessToken) {
      cookies().set(authKey, user.data.accessToken);
      redirect("/dashboard");
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};
