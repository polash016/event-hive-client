import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    createCategory: build.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
