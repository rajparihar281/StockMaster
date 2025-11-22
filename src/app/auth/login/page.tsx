export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* ========================================
          TEMPORARY NAVBAR 
          (Your friend can replace this section later)
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
            <div className="space-y-4">
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
                  placeholder="Enter your username"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
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
                  placeholder="Enter your password"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>

              {/* Sign In Button */}
              <button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg">
                Sign In
              </button>
            </div>

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
    </div>
  );
}