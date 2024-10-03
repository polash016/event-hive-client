import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initPayment: build.mutation({
      query: (id) => ({
        url: `/payment/create-checkout-session/${id}`,
        method: "POST",
        contentType: "application/json",
      }),
      invalidatesTags: ["payment"],
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
  useInitPaymentMutation,
  useGetAllOrganizerQuery,
  useDeleteOrganizerMutation,
} = paymentApi;
