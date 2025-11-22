"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateUsername = (value: string) => {
    if (value.length < 6 || value.length > 12) {
      return "Username must be 6-12 characters";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value.length >= 8;

    if (!hasMinLength) return "Password must be at least 8 characters";
    if (!hasLowerCase) return "Password must contain a lowercase letter";
    if (!hasUpperCase) return "Password must contain an uppercase letter";
    if (!hasSpecialChar) return "Password must contain a special character";
    
    return "";
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setErrors({ ...errors, username: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({ ...errors, password: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      return;
    }

    // Validation passed - proceed with login
    console.log("Login successful!", { username, password });
    // Add your login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ========================================
          TEMPORARY NAVBAR 
      ========================================= */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
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
                <h1 className="text-lg font-bold text-slate-800">StockMaster</h1>
                <p className="text-xs text-slate-500">Inventory Management</p>
              </div>
            </div>

            {/* Right: Links */}
            <div className="flex items-center gap-6">
              <a
                href="/auth/login"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Login
              </a>
              <a
                href="/auth/signup"
                className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* ======================================== */}

      {/* Login Container */}
      <div className="flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md">
          {/* Container Card with Enhanced Shadow */}
          <div className="bg-white rounded-lg shadow-2xl p-8 space-y-6 border border-slate-100">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
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
                <h1 className="text-2xl font-bold text-slate-800">StockMaster</h1>
                <p className="text-sm text-slate-500 mt-1">Inventory Management System</p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-slate-700 block"
                >
                  Login ID
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter your username"
                  className={`w-full h-10 px-3 py-2 text-sm rounded-md border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent shadow-sm transition-all ${
                    errors.username
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 focus:ring-blue-500"
                  }`}
                />
                {errors.username && (
                  <p className="text-xs text-red-600 flex items-center gap-1 animate-shake">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700 block"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className={`w-full h-10 px-3 py-2 text-sm rounded-md border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent shadow-sm transition-all ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-slate-300 focus:ring-blue-500"
                  }`}
                />
                {errors.password && (
                  <p className="text-xs text-red-600 flex items-center gap-1 animate-shake">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </form>

            {/* Footer Links */}
            <div className="flex items-center justify-center gap-2 text-sm pt-4 border-t border-slate-200">
              <a
                href="/auth/reset-password"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot Password
              </a>
              <span className="text-slate-400">|</span>
              <a
                href="/auth/signup"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS Animation */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        .animate-shake {
          animation: shake 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}