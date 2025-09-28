import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query({
      query: (params = {}) => ({
        url: "/category",
        method: "GET",
        params,
      }),
      providesTags: ["Category"],
    }),

    // Get categories for navbar (original ordering)
    getCategoriesForNavbar: builder.query({
      query: () => ({
        url: "/category/navbar",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // Get single category
    getCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // Create category
    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: "/category",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Category"],
    }),

    // Update category
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Category"],
    }),

    // Delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoriesForNavbarQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
