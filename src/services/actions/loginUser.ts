import { envVariable } from "@/config";
import { FieldValues } from "react-hook-form";

export const loginUser = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `https://event-hive-srm9.onrender.com/api/v1/auth/login`,
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

    return user;
  } catch (error) {
    console.log(error);
  }
};
