// Custom JWT decode function for Edge Runtime compatibility
export const decodedToken = (token) => {
  try {
    // Remove the header and signature, keep only the payload
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    // Convert base64url to base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Decode the base64 string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};
