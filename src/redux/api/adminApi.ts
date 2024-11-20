import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/user/create-admin",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["admin"],
    }),
    getAllAdmin: build.query({
      query: (params) => ({
        url: "/admin",
        method: "GET",
        params: params,
      }),
      providesTags: ["admin"],
    }),

    getAdminStats: build.query({
      query: () => ({
        url: "/admin/statistics",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateAdminMutation,
  useGetAllAdminQuery,
  useDeleteAdminMutation,
  useGetAdminStatsQuery,
} = adminApi;
