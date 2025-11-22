"use client";

import React, { useState } from "react";

// Tabs navigation options
const tabs = ["Dashboard", "Operations", "Products", "Move History", "Settings"];

// Demo data
const moveHistoryData = [
  { reference: "WH/IN/0001", date: "12/1/2001", contact: "Azure Interior", from: "vendor", to: "WH/Stock1", quantity: 20, status: "Ready", direction: "in", product: "Office Chair" },
  { reference: "WH/IN/0001", date: "12/1/2001", contact: "Azure Interior", from: "vendor", to: "WH/Stock1", quantity: 30, status: "Ready", direction: "in", product: "Desk Lamp" },
  { reference: "WH/OUT/0002", date: "12/1/2001", contact: "Azure Interior", from: "WH/Stock1", to: "vendor", quantity: 15, status: "Ready", direction: "out", product: "Office Chair" },
  { reference: "WH/OUT/0002", date: "12/1/2001", contact: "Azure Interior", from: "WH/Stock2", to: "vendor", quantity: 10, status: "Ready", direction: "out", product: "Desk Lamp" },
  { reference: "WH/OUT/0003", date: "12/2/2001", contact: "Modern Furnish", from: "WH/Stock1", to: "customer", quantity: 25, status: "Pending", direction: "out", product: "Monitor Stand" },
  { reference: "WH/IN/0004", date: "12/3/2001", contact: "Modern Furnish", from: "vendor", to: "WH/Stock2", quantity: 40, status: "In Progress", direction: "in", product: "Conference Table" },
];

function getStatusBadge(row) {
  if (row.direction === "in") {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-700 border-green-300">
        {row.status}
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium border bg-red-100 text-red-700 border-red-300">
      {row.status}
    </span>
  );
}

export default function MoveHistoryPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [activeTab, setActiveTab] = useState("Move History");

  // Filter by reference or contact
  const filteredData = moveHistoryData.filter(
    item =>
      item.reference.toLowerCase().includes(search.toLowerCase()) ||
      item.contact.toLowerCase().includes(search.toLowerCase())
  );

  // Kanban group by status
  const statusGroups = {
    Ready: filteredData.filter(m => m.status === "Ready"),
    "In Progress": filteredData.filter(m => m.status === "In Progress"),
    Pending: filteredData.filter(m => m.status === "Pending"),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 w-[900px] max-w-full">
        {/* Tabs */}
        <nav className="flex gap-4 mb-6 border-b border-blue-100 pb-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-medium px-3 py-2 transition ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        {/* Header and Actions */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 font-semibold">
              + NEW
            </button>
            <h1 className="text-xl font-bold text-gray-800">Move History</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by reference or contact..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-3 pr-4 py-1.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            {/* View Toggle */}
            <div className="flex bg-blue-50 rounded-lg border border-blue-200">
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded transition ${
                  view === "list"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                title="List View"
              >
                List
              </button>
              <button
                onClick={() => setView("kanban")}
                className={`p-2 rounded transition ${
                  view === "kanban"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                title="Kanban View"
              >
                Kanban
              </button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        {view === "list" ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Reference</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">From</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">To</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition">
                    <td className="px-6 py-3 text-blue-600 font-medium">{row.reference}</td>
                    <td className="px-6 py-3 text-gray-700">{row.date}</td>
                    <td className="px-6 py-3 text-gray-700">{row.contact}</td>
                    <td className="px-6 py-3 text-gray-700">{row.from}</td>
                    <td className="px-6 py-3 text-gray-700">{row.to}</td>
                    <td className="px-6 py-3 text-gray-700">{row.product}</td>
                    <td className="px-6 py-3 text-gray-700">{row.quantity}</td>
                    <td className="px-6 py-3">{getStatusBadge(row)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            {Object.entries(statusGroups).map(([status, items]) => (
              <div key={status} className="bg-white border-blue-100 border rounded-lg p-4 shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg text-gray-800">{status}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {items.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {items.map((row, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-3 hover:shadow transition cursor-pointer">
                      <div className="font-semibold text-blue-600 mb-1">{row.reference} - {row.product}</div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Contact: {row.contact}</div>
                        <div>Date: {row.date}</div>
                        <div>From: {row.from}, To: {row.to}</div>
                        <div>Qty: {row.quantity}</div>
                      </div>
                      <div className="mt-2">{getStatusBadge(row)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Info note */}
        <div className="mt-6 text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded p-4">
          Populate all moves done between <span className="font-semibold">from</span> and <span className="font-semibold">to</span> location in inventory.<br />
          If a single reference has multiple products, display them in multiple rows.<br />
          <span className="text-green-700 font-semibold">In events</span> will be shown in green.<br />
          <span className="text-red-700 font-semibold">Out moves</span> will be shown in red.
        </div>
      </div>
    </div>
  );
}
