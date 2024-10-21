import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
//
// http://localhost:3000

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://event-hive-two.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["organizer", "admin", "event", "user", "category", "payment"],
});

export const {} = baseApi;
