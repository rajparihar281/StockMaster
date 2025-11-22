"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashBoardLayout";

export default function NewRecieptPage() {
  const [status, setStatus] = useState<"Draft" | "Ready" | "Done">("Draft");

  // Mock current user (this would come from your auth system)
  const currentUser = "John Doe";

  // Handle status change based on current status
  const handleStatusButtonClick = () => {
    if (status === "Draft") {
      setStatus("Ready");
    } else if (status === "Ready") {
      setStatus("Done");
    }
    // If already "Done", do nothing
  };

  // Get button text based on current status
  const getStatusButtonText = () => {
    if (status === "Draft") return "To Do";
    if (status === "Ready") return "Validate";
    return "Completed"; // When status is "Done"
  };

  // Get button color based on current status
  const getStatusButtonColor = () => {
    if (status === "Draft") return "bg-yellow-600 hover:bg-yellow-700";
    if (status === "Ready") return "bg-green-600 hover:bg-green-700";
    return "bg-gray-400 cursor-not-allowed"; // When status is "Done"
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50">
        {/* ========================================
          NAVBAR 1: Page Title
      ========================================= */}
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Link href="/operations/reciepts">
                <button className="text-slate-600 hover:text-slate-900 mr-4">
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
              <h1 className="text-xl font-bold text-slate-800">New Reciept</h1>
            </div>
          </div>
        </div>

        {/* ========================================
          NAVBAR 2: Action Buttons + Status Display
      ========================================= */}
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              {/* Left Side: Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Dynamic Status Button (To Do / Validate / Completed) */}
                <button
                  onClick={handleStatusButtonClick}
                  disabled={status === "Done"}
                  className={`px-4 py-2 text-white text-sm font-medium rounded-md transition-colors ${getStatusButtonColor()}`}
                >
                  {getStatusButtonText()}
                </button>

                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors">
                  Print
                </button>

                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors">
                  Cancel
                </button>
              </div>

              {/* Right Side: Status Display (Text Only) */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">
                  Status:
                </span>
                <span className="px-3 py-1.5 text-sm font-semibold text-slate-900 bg-slate-100 rounded-md border border-slate-300">
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
          MAIN CONTENT: Reciept Form
      ========================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-8">
            {/* ========================================
              RECIEPT INFO SECTION
          ========================================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reference Number */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Reference
                </label>
                <input
                  type="text"
                  value="WH/IN/001"
                  readOnly
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-slate-50 text-slate-900"
                />
              </div>

              {/* Receive From */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Receive From
                </label>
                <input
                  type="text"
                  placeholder="Enter vendor name"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              {/* Schedule Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Schedule Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
              </div>

              {/* Responsible (Auto-filled) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Responsible
                </label>
                <input
                  type="text"
                  value={currentUser}
                  readOnly
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-slate-50 text-slate-900"
                />
              </div>
            </div>

            {/* ========================================
              PRODUCTS SECTION (Tabular Form)
          ========================================= */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Products
              </h2>

              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Demand
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {/* ========================================
                      PRODUCT ROW - MODIFY THIS SECTION
                  ========================================= */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        DESK001
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        <input
                          type="number"
                          placeholder="0"
                          className="w-24 px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        <input
                          type="number"
                          placeholder="0"
                          className="w-24 px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                        />
                      </td>
                    </tr>
                    {/* ========================================
                      END PRODUCT ROW
                  ========================================= */}
                  </tbody>
                </table>
              </div>

              {/* Add Product Button (Placeholder for future) */}
              <button className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}