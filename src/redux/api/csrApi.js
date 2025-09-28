import { baseApi } from "./baseApi";

export const csrApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all CSRs
    getCSRs: builder.query({
      query: (params = {}) => ({
        url: "/csr",
        method: "GET",
        params,
      }),
      providesTags: ["CSR"],
    }),

    // Get single CSR
    getCSR: builder.query({
      query: (id) => ({
        url: `/csr/${id}`,
        method: "GET",
      }),
      providesTags: ["CSR"],
    }),

    // Create CSR with file upload
    createCSR: builder.mutation({
      query: (formData) => {
        console.log(formData);
        return {
          url: "/csr/create-csr",
          method: "POST",
          contentType: "multipart/form-data",
          data: formData,
        };
      },
      invalidatesTags: ["CSR"],
    }),

    // Update CSR with file upload
    updateCSR: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/csr/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data: formData,
      }),
      invalidatesTags: ["CSR"],
    }),

    // Delete CSR
    deleteCSR: builder.mutation({
      query: (id) => ({
        url: `/csr/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CSR"],
    }),
  }),
});

export const {
  useGetCSRsQuery,
  useGetCSRQuery,
  useCreateCSRMutation,
  useUpdateCSRMutation,
  useDeleteCSRMutation,
} = csrApi;
