// src/services/authService.ts
import axios from "@/api/axiosInstance";

export const doLogin = (credentials: {
  username: string;
  password: string;
}) => {
  return axios.post("/v1/login", credentials); // Adjust endpoint as per API
};

export const doLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userProfile");

  window.location.href = "/login"; // Full page reload
};
