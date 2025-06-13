import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";

interface User {
  id: string;
  username: string;
  email?: string;
  language: string;
  planExpDate: string;
  timeZone: string;
  planName: string;
  profilePic: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  // console.log("context while login", context);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasJustLoggedIn = useRef(false); // 🚨 This prevents refresh after login
  // Check if user is logged in on app start
  useEffect(() => {
    // Prevent calling refresh if just logged in
    if (!hasJustLoggedIn.current && refreshToken && user?.id) {
      console.log("We are inside if state for chakauth");
      checkAuthStatus();
    } else {
      setIsLoading(false); // skip refresh, just set loading to false
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Try to refresh token on app start to see if user is still authenticated
      const response = await fetch(
        "https://member.gmbbriefcase.com/api/v1/refresh-access-token",
        {
          method: "POST",
          credentials: "include", // This sends the HttpOnly cookie
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh_token: refreshToken,
            userId: user.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Refresh token invalid or expired");
      }
      const data = await response.json();
      console.log("check auth token data", data);
      setAccessToken(data.accessToken);
      setUser(data.user);
    } catch (error) {
      console.warn("Auth refresh failed:", error);
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch(
        "https://member.gmbbriefcase.com/api/v1/login",
        {
          method: "POST",
          // credentials: "include", // This allows setting HttpOnly cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // console.log("login response data", data);
      setAccessToken(data.data.jwtTokens.access_token);
      setRefreshToken(data.data.jwtTokens.refresh_token);
      setUser(data.data.profile);
      hasJustLoggedIn.current = true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    // Clear local state regardless of API call success
    setAccessToken(null);
    setUser(null);
    setRefreshToken(null);
    window.location.href = "/login";
  };

  const isAuthenticated = !!accessToken && !!user;

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setAccessToken,
    setRefreshToken,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
