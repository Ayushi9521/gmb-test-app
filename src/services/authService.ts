import axiosInstance from "@/api/axiosInstance";

// The login function is now handled by the AuthContext
// But we can keep other auth-related API calls here

export const refreshAccessToken = async () => {
  try {
    // const response = await fetch(
    //   "https://member.gmbbriefcase.com/api/auth/refresh",
    //   {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    const response = await axiosInstance.post("/auth/refresh");
    // if (!response.ok) {
    //   throw new Error("Refresh failed");
    // }

    return await response.data;
  } catch (error) {
    console.error("Token refresh error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Other auth-related API calls can go here
export const verifyToken = () => {
  return axiosInstance.get("/auth/verify");
};

export const getUserProfile = () => {
  return axiosInstance.get("/user/profile");
};
