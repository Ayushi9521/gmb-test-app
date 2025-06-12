import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { setAuthHelpers } from "@/api/axiosInstance";

export const useAxiosAuth = () => {
  const { accessToken, setAccessToken, logout } = useAuth();

  useEffect(() => {
    const getAccessToken = () => accessToken;

    setAuthHelpers(getAccessToken, setAccessToken, logout);
  }, [accessToken, setAccessToken, logout]);
};
