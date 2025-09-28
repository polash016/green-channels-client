import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createContact: build.mutation({
      query: (data) => ({
        url: "/contact/create-contact",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["contacts"],
    }),
    getAllContacts: build.query({
      query: (params) => ({
        url: "/contact",
        method: "GET",
        params: params,
      }),
      providesTags: ["contacts"],
    }),

    deleteContact: build.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contacts"],
    }),
    updateContact: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/contact/${id}`,
          method: "PATCH",
          contentType: "multipart/form-data",
          data,
        };
      },
      invalidatesTags: ["contacts"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateContactMutation,
  useGetAllContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactApi;
