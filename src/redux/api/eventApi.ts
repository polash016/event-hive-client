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
    getSingleEvent: build.query({
      query: (id) => {
        return {
          url: `/event/${id}`,
          method: "GET",
        };
      },
      providesTags: ["event"],
    }),
    updateEvent: build.mutation({
      query: (data) => ({
        url: `/event/${data.id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data: data.data,
      }),
      invalidatesTags: ["event"],
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
  useGetSingleEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
