import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
//
// http://localhost:3000

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_GREEN_CHANNELS_API_URL ||
      "http://localhost:5000/api/v1",
    // prepareHeaders: (headers, { getState }) => {
    //   const state = getState();
    //   const accessToken = state?.auth?.accessToken;

    //   if (accessToken) {
    //     headers.set("Authorization", `Bearer ${accessToken}`);
    //   }

    //   return headers;
    // }
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["products", "contacts", "employees", "User", "CSR", "Category"],
  keepUnusedDataFor: 60, // Keep data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: false, // Don't refetch on window focus
  refetchOnReconnect: true, // Refetch on network reconnection
});

export const {} = baseApi;
