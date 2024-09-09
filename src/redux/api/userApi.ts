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
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PATCH",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["user"],
    }),
  }),

  overrideExisting: true,
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
