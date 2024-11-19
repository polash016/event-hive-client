import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initPayment: build.mutation({
      query: (id) => ({
        url: `/payment/init/${id}`,
        method: "POST",
        // contentType: "application/json",
      }),
      invalidatesTags: ["payment"],
    }),
  }),

  overrideExisting: true,
});

export const { useInitPaymentMutation } = paymentApi;
