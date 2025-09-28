import { baseApi } from "./baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation({
      query: (data) => ({
        url: "/employee/create-employee",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: ["employees"],
    }),
    getAllEmployees: build.query({
      query: (params) => ({
        url: "/employee",
        method: "GET",
        params: params,
      }),
      providesTags: ["employees"],
    }),
    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employees"],
    }),
    updateEmployee: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `/employee/${id}`,
          method: "PATCH",
          contentType: "multipart/form-data",
          data,
        };
      },
      invalidatesTags: ["employees"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeeApi;
