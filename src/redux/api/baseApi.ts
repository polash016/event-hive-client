import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
//
// http://localhost:3000

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_EVENT_HIVE_API_URL as string,
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["organizer", "admin", "event", "user", "category", "payment"],
});

export const {} = baseApi;
