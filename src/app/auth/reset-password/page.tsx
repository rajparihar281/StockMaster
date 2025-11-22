"use client";

import { useState } from "react";

export default function ResetPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    otp: ["", "", "", "", "", ""],
    newPassword: "",
    confirmPassword: "",
  });

  // Handle Step 1: Username + Email
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: In real app, send OTP to email here
    setCurrentStep(2);
  };

  // Handle Step 2: OTP Verification
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData({ ...formData, otp: newOtp });

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Handle Resend OTP - CLEARS ALL OTP INPUTS
  const handleResendOtp = () => {
    // Clear all OTP boxes
    setFormData({ ...formData, otp: ["", "", "", "", "", ""] });
    
    // Focus on first OTP input
    setTimeout(() => {
      const firstInput = document.getElementById("otp-0");
      firstInput?.focus();
    }, 100);

    // Mock: In real app, resend OTP API call here
    alert("OTP has been resent to your email!");
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: Verify OTP here
    setCurrentStep(3);
  };

  // Handle Step 3: New Password
  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock: Reset password here
    // Show success message and redirect
    alert("Password reset successful! Redirecting to login...");
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ========================================
          TEMPORARY NAVBAR 
      ========================================= */}
      <nav className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

      {/* Reset Password Container */}
      <div className="flex items-center justify-center p-4 pt-20">
        <div className="w-full max-w-md">
          {/* Container Card */}
          <div className="bg-white rounded-lg shadow-2xl p-8 border border-slate-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
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
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-800">Reset Password</h1>
              <p className="text-sm text-slate-500 mt-2">
                Follow the steps to recover your account
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-600">
                  Step {currentStep} of 3
                </span>
                <span className="text-xs text-slate-500">
                  {currentStep === 1 && "Verify Identity"}
                  {currentStep === 2 && "Enter OTP"}
                  {currentStep === 3 && "Set New Password"}
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ease-out ${
                      step <= currentStep
                        ? "bg-blue-600 scale-100"
                        : "bg-slate-200 scale-95"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step Content with Animations */}
            <div className="min-h-[320px]">
              {/* STEP 1: Username + Email */}
              {currentStep === 1 && (
                <form
                  onSubmit={handleStep1Submit}
                  className="space-y-4 animate-fadeIn"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="username"
                      className="text-sm font-medium text-slate-700 block"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      required
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-700 block"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Send OTP
                    </button>
                  </div>

                  <div className="flex items-center justify-center text-sm pt-2">
                    <a
                      href="/auth/login"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Back to Login
                    </a>
                  </div>
                </form>
              )}

              {/* STEP 2: OTP Verification */}
              {currentStep === 2 && (
                <form
                  onSubmit={handleStep2Submit}
                  className="space-y-6 animate-fadeIn"
                >
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-6">
                      Enter the 6-digit code sent to
                      <br />
                      <span className="font-semibold text-slate-800">
                        {formData.email}
                      </span>
                    </p>
                  </div>

                  {/* OTP Input Boxes */}
                  <div className="flex gap-2 justify-center">
                    {formData.otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !digit && index > 0) {
                            const prevInput = document.getElementById(
                              `otp-${index - 1}`
                            );
                            prevInput?.focus();
                          }
                        }}
                        className="w-12 h-12 text-center text-lg font-semibold rounded-md border-2 border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all hover:border-slate-400"
                        required
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                    >
                      Resend OTP
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Verify OTP
                    </button>
                  </div>

                  <div className="flex items-center justify-center text-sm">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-slate-600 hover:text-slate-800 hover:underline"
                    >
                      ← Go Back
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: New Password */}
              {currentStep === 3 && (
                <form
                  onSubmit={handleStep3Submit}
                  className="space-y-4 animate-fadeIn"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="newPassword"
                      className="text-sm font-medium text-slate-700 block"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      required
                      placeholder="Enter new password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, newPassword: e.target.value })
                      }
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-slate-700 block"
                    >
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      placeholder="Re-enter new password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                    />
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              formData.newPassword.length >= level * 2
                                ? formData.newPassword.length < 6
                                  ? "bg-red-500"
                                  : formData.newPassword.length < 10
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">
                        {formData.newPassword.length < 6
                          ? "Weak password"
                          : formData.newPassword.length < 10
                          ? "Medium password"
                          : "Strong password"}
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Reset Password
                    </button>
                  </div>

                  <div className="flex items-center justify-center text-sm">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-slate-600 hover:text-slate-800 hover:underline"
                    >
                      ← Go Back
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}