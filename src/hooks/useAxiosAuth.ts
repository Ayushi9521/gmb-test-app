import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { setAuthHelpers } from "@/api/axiosInstance";

export const useAxiosAuth = () => {
  const { accessToken, setAccessToken, logout, refreshToken, setRefreshToken } =
    useAuth();

  useEffect(() => {
    const getAccessToken = () => accessToken;
    const getRefreshToken = () => refreshToken;

    setAuthHelpers(getAccessToken, setAccessToken, logout, getRefreshToken);
  }, [accessToken, setAccessToken, logout, refreshToken, setRefreshToken]);
};
