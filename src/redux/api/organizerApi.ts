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
      query: (params) => ({
        url: "/organizer",
        method: "GET",
        params: params,
      }),
      providesTags: ["organizer"],
    }),
    deleteOrganizer: build.mutation({
      query: (id) => ({
        url: `/organizer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["organizer"],
    }),
    updateOrganizer: build.mutation({
      query: ({ data, id }) => ({
        url: `/organizer/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["organizer"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateOrganizerMutation,
  useGetAllOrganizerQuery,
  useDeleteOrganizerMutation,
} = organizerApi;
