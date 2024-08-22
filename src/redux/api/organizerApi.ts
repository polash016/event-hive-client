import { baseApi } from "./baseApi";

const organizerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrganizer: build.mutation({
      query: (data) => ({
        url: "/user/create-organizer",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["organizer"],
    }),
    getAllOrganizer: build.query({
      query: () => ({
        url: "/organizer",
        method: "GET",
        // params: params,
      }),
      providesTags: ["organizer"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateOrganizerMutation, useGetAllOrganizerQuery } =
  organizerApi;
