"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
const router = useRouter();

  const validateUsername = (value: string) => {
    if (value.length < 6 || value.length > 12) {
      return "Username must be 6-12 characters";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?\":{}|<>]/.test(value);
    const hasMinLength = value.length >= 8;

    if (!hasMinLength) return "Password must be at least 8 characters";
    if (!hasLowerCase) return "Password must contain a lowercase letter";
    if (!hasUpperCase) return "Password must contain an uppercase letter";
    if (!hasSpecialChar) return "Password must contain a special character";

    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
router.push("/dashboard");
    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return;
    }
    console.log("Login successful!", { username, password });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      {/* NAVBAR (Dark Mode) */}
      <nav className="bg-[#1E293B] border-b border-[#334155] shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-lg font-bold text-white">StockMaster</h1>
                <p className="text-xs text-slate-400">Inventory Management</p>
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex items-center gap-6">
              <a
                href="/auth/login"
                className="text-sm text-slate-300 hover:text-blue-400"
              >
                Login
              </a>
              <a
                href="/auth/signup"
                className="text-sm text-slate-300 hover:text-blue-400"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* LOGIN CARD */}
      <div className="flex justify-center items-center flex-1 px-4">
        <div className="w-full max-w-md bg-[#1E293B] border border-[#334155] rounded-xl shadow-xl p-8">
          {/* Logo top */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-lg mx-auto flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h1 className="text-white text-2xl font-bold mt-2">StockMaster</h1>
            <p className="text-slate-400 text-sm">
              Inventory Management System
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="space-y-1">
              <label className="text-sm text-slate-300">Login ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors({ ...errors, username: "" });
                }}
                className={`w-full h-10 px-3 rounded-md bg-[#0F172A] text-white border ${
                  errors.username ? "border-red-500" : "border-[#334155]"
                } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="text-xs text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
                className={`w-full h-10 px-3 rounded-md bg-[#0F172A] text-white border ${
                  errors.password ? "border-red-500" : "border-[#334155]"
                } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full h-11 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition-all"
            >
              Sign In
            </button>
          </form>

          {/* Bottom links */}
          <div className="text-center mt-6 text-sm text-slate-400">
            <a
              href="/auth/reset-password/"
              className="text-blue-400 hover:underline"
            >
              Forgot Password
            </a>
            <span className="mx-2 text-slate-600">|</span>
            <a href="/auth/signup" className="text-blue-400 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
