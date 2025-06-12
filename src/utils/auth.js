// utils/auth.js
export const isAuthenticated = () => {
  // Example: check token existence
  return !!localStorage.getItem("accessToken");
};
