import Link from "next/link";

export default function NewrecieptPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/operations/reciepts">
                <button className="text-slate-600 hover:text-slate-900">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
              </Link>
              <h1 className="text-xl font-bold text-slate-800">
                Create New reciept
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              New Reciept Form
            </h2>
            <p className="text-slate-600 mb-8">
              This page will contain the form to create a new reciept.
              <br />
              Form fields to be implemented by your team.
            </p>
            <Link href="/operations/reciepts">
              <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors">
                Back to reciepts List
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}