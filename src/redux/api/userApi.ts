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

    getAllUsers: build.query({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params: params,
      }),
      providesTags: ["user"],
    }),

    updateStatus: build.mutation({
      query: (data) => {
        console.log("api data", data);
        return {
          url: `/user/${data.id}/status`,
          method: "PATCH",
          contentType: "application/json",
          data: { status: data.status },
        };
      },
      invalidatesTags: ["user"],
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

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateStatusMutation,
} = userApi;
