import { getNewAccessToken } from "@/services/auth.service";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localStorage";
import axios from "axios";
import setAccessToken from "../setAccessToken";
import { authKey } from "@/constant/authKey";

const axiosInstance = axios.create(); //{ withCredentials: true }

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

axiosInstance.defaults.headers.post["Accept"] = "application/json";

axiosInstance.defaults.timeout = 60000;

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      // Check if token is expired before sending request
      try {
        const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        // If token expires in less than 30 seconds, don't send it
        if (tokenPayload.exp && tokenPayload.exp < currentTime + 30) {
          console.log(
            "Token expires soon, will be refreshed by response interceptor"
          );
        }

        config.headers.Authorization = accessToken;
      } catch (error) {
        console.error("Invalid token format:", error);
        removeFromLocalStorage(authKey);
      }
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//Add a response interceptor
axiosInstance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const resObj = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      message: response?.data?.message,
    };

    return resObj;
  },
  async function (error) {
    const config = error.config;

    // if (error.code === "ERR_NETWORK") {
    //   saveToLocalStorage(authKey, "");
    //   window.location.href = "/login"; // Redirect to login or handle logout logic
    //   return Promise.reject(error);
    // }

    // Handle token refresh only for 401 (Unauthorized) errors
    // Don't retry on 500 errors to prevent infinite loops
    if (error.response?.status === 401 && !config._retry) {
      config._retry = true;

      // Skip refresh for refresh token endpoint to prevent infinite loop
      if (config.url?.includes("/auth/refresh-token")) {
        removeFromLocalStorage(authKey);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      try {
        const response = await getNewAccessToken();
        const accessToken = response?.data?.accessToken;
        if (accessToken) {
          saveToLocalStorage(authKey, accessToken);
          setAccessToken(accessToken);
          config.headers["Authorization"] = accessToken;
          return axiosInstance(config); // Retry the original request
        } else {
          throw new Error("No access token received");
        }
      } catch (refreshError) {
        // Handle refresh failure (logout, redirect, etc.)
        console.error("Token refresh failed:", refreshError);
        removeFromLocalStorage(authKey);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    } else {
      const errorObj = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something Went Wrong",
        errorMessages: error?.response?.data?.message,
      };
      return errorObj;
    }
  }
);

export { axiosInstance };

// import { getNewAccessToken, getNewAccessToken2 } from "@/services/auth.service";
// import { getFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage";
// import axios from "axios";
// import setAccessToken from "../setAccessToken";
// import { authKey } from "@/constant/authKey";

// const axiosInstance = axios.create(); //{ withCredentials: true }

// axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

// axiosInstance.defaults.headers.post["Accept"] = "application/json";

// axiosInstance.defaults.timeout = 60000;

// axiosInstance.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent

//     const accessToken = getFromLocalStorage(authKey);

//     if (accessToken) {
//       config.headers.Authorization = accessToken;
//     }

//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// //Add a response interceptor
// axiosInstance.interceptors.response.use(
//   function (response) {
//     const resObj = {
//       data: response?.data?.data,
//       meta: response?.data?.meta,
//       message: response?.data?.message,
//     };
//     return resObj;
//   },
//   async function (error) {
//     const config = error.config;

//     // Handle network errors (no internet or server unreachable)
//     if (error.code === "ERR_NETWORK") {
//       const errorObj = {
//         statusCode: 0,
//         message: "Network Error: Please check your internet connection",
//         errorMessages: "Unable to connect to the server",
//         isNetworkError: true,
//       };
//       return Promise.reject(errorObj);
//     }

//     // Handle token refresh (500 error)
//     if (error.response?.status === 500 && !config._retry) {
//       config._retry = true;
//       try {
//         const response = await getNewAccessToken();
//         const accessToken = response?.data?.accessToken;
//         if (!accessToken) {
//           throw new Error("Failed to get new access token");
//         }
//         saveToLocalStorage(authKey, accessToken);
//         setAccessToken(accessToken);
//         config.headers["Authorization"] = accessToken;
//         return axiosInstance(config);
//       } catch (refreshError) {
//         // Only clear auth and redirect if it's not a network error
//         if (refreshError?.isNetworkError) {
//           return Promise.reject(refreshError);
//         }
//         // Clear auth on token refresh failure
//         saveToLocalStorage(authKey, "");
//         if (typeof window !== "undefined") {
//           window.location.href = "/";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     // Handle other errors
//     const errorObj = {
//       statusCode: error?.response?.data?.statusCode || 500,
//       message: error?.response?.data?.message || "Something Went Wrong",
//       errorMessages: error?.response?.data?.message,
//     };
//     return Promise.reject(errorObj);
//   }
// );

// export { axiosInstance };
