import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: "/user/my",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetProfileQuery } = userApi;
