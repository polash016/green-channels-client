import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["products"],
    }),
    getAllProducts: build.query({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params: params,
      }),
      providesTags: (result, error, params) => [
        "products",
        ...(params.categoryId
          ? [{ type: "products", id: `category-${params.categoryId}` }]
          : []),
        ...(params.subcategoryId
          ? [{ type: "products", id: `subcategory-${params.subcategoryId}` }]
          : []),
        ...(params.nestedCategoryId
          ? [{ type: "products", id: `nested-${params.nestedCategoryId}` }]
          : []),
      ],
    }),

    getSingleProduct: build.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),

    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProductImage: build.mutation({
      query: ({ productId, imageIndex }) => ({
        url: `/product/${productId}/images/${imageIndex}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductImageMutation,
} = productApi;
