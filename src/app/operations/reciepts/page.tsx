"use client";

import { useState } from "react";
import Link from "next/link";

// ============================================
// MOCK DATA - EASY TO FIND AND MODIFY
// ============================================
const MOCK_RECEIPTS = [
  {
    id: 1,
    reference: "WH/IN/001",
    from: "ABC Steel Suppliers",
    to: "WH/Stock1",
    contact: "John Smith",
    scheduleDate: "2024-01-15",
    status: "Ready",
  },
  {
    id: 2,
    reference: "WH/IN/002",
    from: "Global Electronics Ltd",
    to: "WH/Stock2",
    contact: "Sarah Johnson",
    scheduleDate: "2024-01-16",
    status: "Draft",
  },
];
// ============================================

export default function ReceiptsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");

  // Client-side search filter
  const filteredReceipts = MOCK_RECEIPTS.filter((receipt) =>
    Object.values(receipt).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ========================================
          PAGE CONTROL NAVBAR
      ========================================= */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: NEW Button + Title */}
            <div className="flex items-center gap-4">
              <Link href="/operations/reciepts/new">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors flex items-center gap-2">
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
                  NEW
                </button>
              </Link>
              <h1 className="text-xl font-bold text-slate-800">Receipts</h1>
            </div>

            {/* Right Side: Search + View Controls */}
            <div className="flex items-center gap-3">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search receipts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 h-9 pl-9 pr-3 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* List/Grid Toggle */}
              <div className="flex border border-slate-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                  title="List View"
                >
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                  title="Grid View"
                >
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
              </div>

              {/* Kanban Button (Placeholder for now) */}
              <button
                className="px-4 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                title="Kanban View (Coming Soon)"
              >
                Kanban
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          MAIN CONTENT AREA
      ========================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* LIST VIEW */}
        {viewMode === "list" && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Schedule Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredReceipts.map((receipt) => (
                  <tr
                    key={receipt.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {receipt.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {receipt.from}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {receipt.to}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {receipt.contact}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {receipt.scheduleDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {receipt.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {filteredReceipts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500 text-sm">No receipts found</p>
              </div>
            )}
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReceipts.map((receipt) => (
              <div
                key={receipt.id}
                className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {receipt.reference}
                    </h3>
                    <span className="text-sm text-slate-600">
                      {receipt.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">From:</span>
                      <span className="text-slate-900 font-medium">
                        {receipt.from}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">To:</span>
                      <span className="text-slate-900 font-medium">
                        {receipt.to}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact:</span>
                      <span className="text-slate-900 font-medium">
                        {receipt.contact}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scheduled:</span>
                      <span className="text-slate-900 font-medium">
                        {receipt.scheduleDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredReceipts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-500 text-sm">No receipts found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}