"use server";

import { FieldValues } from "react-hook-form";

export const loginUser = async (payload: FieldValues) => {
  console.log(`${process.env.EVENT_HIVE_API_URL}/auth/login`);
  const res = await fetch(`${process.env.EVENT_HIVE_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const user = await res.json();

  return user;
};
