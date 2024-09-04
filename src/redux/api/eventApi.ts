import { baseApi } from "./baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEvent: build.mutation({
      query: (data) => ({
        url: "/event/create-event",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["event"],
    }),
    getAllEvent: build.query({
      query: (params) => ({
        url: "/event",
        method: "GET",
        params: params,
      }),
      providesTags: ["event"],
    }),
    deleteEvent: build.mutation({
      query: (id) => ({
        url: `/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["event"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateEventMutation,
  useGetAllEventQuery,
  useDeleteEventMutation,
} = eventApi;
