import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
//
// http://localhost:3000

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://event-hive-srm9.onrender.com/api/v1",
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["organizer", "admin", "event", "user", "category"],
});

export const {} = baseApi;
