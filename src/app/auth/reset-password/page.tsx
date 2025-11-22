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

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData({ ...formData, otp: newOtp });

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResendOtp = () => {
    setFormData({ ...formData, otp: ["", "", "", "", "", ""] });
    setTimeout(() => {
      const firstInput = document.getElementById("otp-0");
      firstInput?.focus();
    }, 100);
    alert("OTP has been resent to your email!");
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password reset successful! Redirecting to login...");
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-[#1E293B] border-b border-[#334155] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="text-sm text-slate-300 hover:text-blue-400 transition-colors"
              >
                Login
              </a>
              <a
                href="/auth/signup"
                className="text-sm text-slate-300 hover:text-blue-400 transition-colors"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Reset Password Container */}
      <div className="flex items-center justify-center p-4 pt-20 flex-1">
        <div className="w-full max-w-md">
          <div className="bg-[#1E293B] rounded-xl shadow-xl p-8 space-y-6 border border-[#334155]">
            {/* Header */}
            <div className="text-center mb-4">
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
              <h1 className="text-2xl font-bold text-white">Reset Password</h1>
              <p className="text-sm text-slate-400 mt-2">
                Follow the steps to recover your account
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-300">
                  Step {currentStep} of 3
                </span>
                <span className="text-xs text-slate-400">
                  {currentStep === 1 && "Verify Identity"}
                  {currentStep === 2 && "Enter OTP"}
                  {currentStep === 3 && "Set New Password"}
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-2 flex-1 rounded-full transition-all
                      ${step <= currentStep ? "bg-blue-600" : "bg-[#334155]"}`}
                  />
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="min-h-[300px]">
              {/* STEP 1: Username + Email */}
              {currentStep === 1 && (
                <form
                  className="space-y-4 animate-fadeIn"
                  onSubmit={handleStep1Submit}
                >
                  {/* Username */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 block">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      placeholder="Enter username"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md 
                        border border-[#334155] bg-[#0F172A] text-white
                        placeholder:text-slate-500 
                        focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                      className="w-full h-10 px-3 py-2 text-sm rounded-md 
                        border border-[#334155] bg-[#0F172A] text-white
                        placeholder:text-slate-500 
                        focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <button
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white 
                    font-medium rounded-md shadow-lg transition-all"
                  >
                    Send OTP
                  </button>

                  <div className="text-center text-sm pt-2">
                    <a
                      href="/auth/login"
                      className="text-blue-400 hover:text-blue-500 hover:underline"
                    >
                      Back to Login
                    </a>
                  </div>
                </form>
              )}

              {/* STEP 2: OTP */}
              {currentStep === 2 && (
                <form
                  className="space-y-6 animate-fadeIn"
                  onSubmit={handleStep2Submit}
                >
                  <p className="text-sm text-slate-400 text-center">
                    Enter the 6-digit code sent to <br />
                    <span className="text-white font-semibold">
                      {formData.email}
                    </span>
                  </p>

                  <div className="flex gap-2 justify-center">
                    {formData.otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        maxLength={1}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !digit && index > 0) {
                            const prev = document.getElementById(
                              `otp-${index - 1}`
                            );
                            prev?.focus();
                          }
                        }}
                        className="w-12 h-12 text-center text-xl font-semibold rounded-md 
                          bg-[#0F172A] border-2 border-[#334155] text-white 
                          focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm text-blue-400 hover:text-blue-500 hover:underline text-center w-full"
                  >
                    Resend OTP
                  </button>

                  <button
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white 
                    font-medium rounded-md shadow-lg transition-all"
                  >
                    Verify OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-slate-400 hover:text-slate-300 text-sm mx-auto block"
                  >
                    ← Go Back
                  </button>
                </form>
              )}

              {/* STEP 3: New Password */}
              {currentStep === 3 && (
                <form
                  className="space-y-4 animate-fadeIn"
                  onSubmit={handleStep3Submit}
                >
                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full h-10 px-3 py-2 rounded-md bg-[#0F172A] 
                        border border-[#334155] text-white placeholder:text-slate-500
                        focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full h-10 px-3 py-2 rounded-md bg-[#0F172A] 
                        border border-[#334155] text-white placeholder:text-slate-500
                        focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Password Strength */}
                  {formData.newPassword && (
                    <div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              formData.newPassword.length >= level * 2
                                ? formData.newPassword.length < 6
                                  ? "bg-red-500"
                                  : formData.newPassword.length < 10
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                                : "bg-[#334155]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white 
                    font-medium rounded-md shadow-lg transition-all"
                  >
                    Reset Password
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-slate-400 hover:text-slate-300 text-sm mx-auto block"
                  >
                    ← Go Back
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

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
