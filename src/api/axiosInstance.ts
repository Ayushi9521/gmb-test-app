import axios from "axios";

const BASE_URL = "https://member.gmbbriefcase.com/api";

const skipAuthRoutes = ["/v1/login", "/auth/refresh", "/auth/logout"];

// We'll inject the auth context functions later
let getAccessToken: (() => string | null) | null = null;
let setAccessToken: ((token: string | null) => void) | null = null;
let handleLogout: (() => void) | null = null;

export const setAuthHelpers = (
  getToken: () => string | null,
  setToken: (token: string | null) => void,
  logout: () => void
) => {
  getAccessToken = getToken;
  setAccessToken = setToken;
  handleLogout = logout;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This ensures cookies are sent with requests
});

// Request interceptor to add access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken?.();
    const isAuthRoute = skipAuthRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for automatic token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthRoute = skipAuthRoutes.some((route) =>
      originalRequest.url?.includes(route)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        // Use fetch instead of axios to avoid recursive interceptors
        const response = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include", // This sends the HttpOnly refresh token cookie
          headers: {
            "Content-Type": "application/json",
          },
        });
        // const response = await axios.post(`${BASE_URL}/auth/refresh`, {
        //   token: getAccessToken?.(),
        // });
        if (!response) {
          throw new Error("Refresh failed");
        }

        const data = await response.json();

        // Update the access token in memory
        if (setAccessToken) {
          setAccessToken(data.accessToken);
        }

        // Update the authorization header for the retry
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear tokens and redirect to login
        if (handleLogout) {
          handleLogout();
        } else {
          window.location.href = "/login"; // Fallback redirect
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
