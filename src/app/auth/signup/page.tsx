"use client";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      {/* NAVBAR (Dark Mode) */}
      <nav className="bg-[#1E293B] border-b border-[#334155] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo & Brand */}
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

            {/* Right: Links */}
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

      {/* Signup Container */}
      <div className="flex items-center justify-center p-4 pt-16 flex-1">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-[#1E293B] rounded-xl shadow-xl p-8 space-y-6 border border-[#334155]">
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
                <h1 className="text-2xl font-bold text-white">
                  Create Account
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Join StockMaster today
                </p>
              </div>
            </div>

            {/* Signup Form */}
            <div className="space-y-4">
              {/* Login ID */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-slate-300 block"
                >
                  Login ID
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-[#334155] bg-[#0F172A] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-300 block"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-[#334155] bg-[#0F172A] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-300 block"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-[#334155] bg-[#0F172A] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-slate-300 block"
                >
                  Re-enter Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-[#334155] bg-[#0F172A] text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Button */}
              <button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors shadow-lg">
                Sign Up
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 text-sm pt-4 border-t border-[#334155]">
              <span className="text-slate-400">Already have an account?</span>
              <a
                href="/auth/login"
                className="text-blue-400 hover:text-blue-500 hover:underline font-medium"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
