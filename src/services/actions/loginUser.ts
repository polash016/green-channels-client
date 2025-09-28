// "use server";
import setAccessToken from "@/helpers/setAccessToken";

export const loginUser = async (payload) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GREEN_CHANNELS_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        credentials: "include",
      }
    );

    const user = await res.json();

    if (user?.data?.accessToken) {
      setAccessToken(user?.data?.accessToken);
    }

    // Note: Refresh token is automatically stored in httpOnly cookies by the backend
    // No need to store it in localStorage or document.cookie

    return user;
  } catch (error) {
    console.log(error);
  }
};
