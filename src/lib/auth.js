// Authentication utility functions

// Token management
export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    // Set token in localStorage with the same key used by auth service
    localStorage.setItem("accessToken", token);

    // Set token in cookies for middleware access
    document.cookie = `accessToken=${token}; path=/; max-age=${
      60 * 60 * 24 * 7
    }; SameSite=Strict`;
  }
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};

// User session management
export const setUserSession = (userData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user-data", JSON.stringify(userData));
  }
};

export const getUserSession = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user-data");
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const removeUserSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user-data");
  }
};

// Authentication state check
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

// Logout function
export const logout = () => {
  removeAuthToken();
  removeUserSession();

  // Redirect to login page
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// Check if user can access protected route
export const canAccessRoute = (route) => {
  if (route.startsWith("/dashboard")) {
    return isAuthenticated();
  }
  return true;
};

// Get redirect URL from query params
export const getRedirectUrl = () => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("redirect") || "/dashboard";
  }
  return "/dashboard";
};
