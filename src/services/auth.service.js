// import { axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodedToken } from "@/utils/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localStorage";
import { deleteCookies } from "./actions/deleteCookies";
import { authKey } from "@/constant/authKey";
import { axiosInstance } from "@/helpers/axios/axiosInstance";

export const storeUserInfo = (accessToken) => {
  return saveToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);

    return {
      ...decodedData,
    };
  }
};

export const isLoggedIn = () => {
  try {
    const authToken = getFromLocalStorage(authKey);
    if (!authToken) return false;

    // Check if token is expired
    const decodedData = decodedToken(authToken);
    if (!decodedData) return false;

    // Check if token is expired (exp is in seconds)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedData.exp && decodedData.exp < currentTime) {
      removeFromLocalStorage(authKey);
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const logOut = async (router) => {
  try {
    // Call logout endpoint to clear server-side session
    await fetch(
      `${process.env.NEXT_PUBLIC_GREEN_CHANNELS_API_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Logout API call failed:", error);
  } finally {
    // Clear client-side storage
    removeFromLocalStorage(authKey);
    deleteCookies([authKey, "refreshToken"]);

    // Redirect to login
    if (router) {
      router.push("/login");
      router.refresh();
    } else if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
};

export const getNewAccessToken2 = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GREEN_CHANNELS_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) throw new Error("Token refresh failed");

    return response.json();
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

export const getNewAccessToken = async () => {
  try {
    // Use fetch directly to avoid axios interceptor loops
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GREEN_CHANNELS_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include", // This sends the httpOnly refresh token cookie
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Token refresh error:", error);
    throw new Error(error.message || "Failed to refresh token");
  }
};
