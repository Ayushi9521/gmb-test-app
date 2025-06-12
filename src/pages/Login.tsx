import React, { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { doLogin } from "@/services/authService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const response = await doLogin({ username, password });
      const { access_token, refresh_token } = response.data.data.jwtTokens;
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      const userProfile = response.data.profile;
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      // setErrorMsg('');
      // toast.error('Login failed. Please check your credentials.')
      toast({
        title: "Login failed",
        description: "Login failed. Please check your credentials.",
        variant: "destructive", // or "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center p-6 xl:p-12">
        <div className="text-center text-white">
          <div className="mb-8">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-lg flex items-center justify-center">
                <img
                  src="https://member.gmbbriefcase.com/content/dist/assets/images/logo.png"
                  alt="GMB Briefcase Logo"
                  className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                />
              </div>
            </div>
            <div className="relative">
              <div className="w-64 h-40 lg:w-80 lg:h-48 mx-auto bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/30 rounded"></div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-white/30 rounded w-3/4"></div>
                  <div className="h-2 bg-white/30 rounded w-1/2"></div>
                  <div className="h-2 bg-white/30 rounded w-2/3"></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded"></div>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white/40 rounded"></div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Welcome to GMB Briefcase
          </h2>
          <p className="text-white/80 text-sm lg:text-base">
            Your All-in-One Google Business Management Suite
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen lg:min-h-0">
        <div className="w-full max-w-md">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              GMB Briefcase
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Sign in to your account
            </p>
          </div>

          {/* {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
              {errorMsg}
            </div>
          )} */}

          <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1 text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
