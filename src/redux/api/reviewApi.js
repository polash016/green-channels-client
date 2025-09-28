import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: "/review/create-review",
        method: "POST",
        data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getAllReviews: build.query({
      query: (params) => ({
        url: "/review",
        method: "GET",
        params: params,
      }),
      providesTags: ["reviews"],
    }),

    getSingleReview: build.query({
      query: (id) => ({
        url: `/review/${id}`,
        method: "GET",
      }),
      providesTags: ["reviews"],
    }),

    deleteReview: build.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviews"],
    }),

    updateReview: build.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["reviews"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
  useGetSingleReviewQuery,
  useUpdateReviewMutation,
} = reviewApi;
