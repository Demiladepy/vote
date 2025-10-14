import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Eye, EyeOff } from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  // ✅ Password Strength Validation
  const validatePassword = (value) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(value)) {
      setPasswordError(
        "Password must include uppercase, lowercase, number & symbol, and be at least 8 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    if (passwordError) {
      alert("Please use a stronger password before proceeding");
      return;
    }

    // Simulate fetching user data from backend
    const fakeUser = {
      name: "Emmanuel Ayeku",
      email,
      location: "Lagos, Nigeria",
      role: "Verified Voter",
      joined: "January 2025",
      voterId: "VSA-93842",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    login(fakeUser);
    onLogin?.();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome!</h1>
          <p className="text-gray-600">
            Log in to{" "}
            <span className="font-semibold">VoteSmart Africa</span> to continue.
          </p>
        </div>

        {/* ✅ Centered Google Login (Icon Only) */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="h-12 w-12 rounded-full bg-white border-gray-300 hover:bg-gray-50 flex items-center justify-center"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285f4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34a853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fbbc04"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#ea4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </Button>
        </div>

        {/* Separator */}
        <div className="relative">
          <Separator className="bg-gray-300" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
            OR
          </span>
        </div>

        {/* Email and Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 text-sm"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                className="h-12 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {password && (
              <p
                className={`text-sm ${
                  passwordError ? "text-red-600" : "text-green-600"
                }`}
              >
                {passwordError || "Strong password ✅"}
              </p>
            )}
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Log In
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
