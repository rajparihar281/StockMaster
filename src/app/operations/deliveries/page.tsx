"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, LayoutGrid, List, Plus, MapPin, Calendar, User } from "lucide-react";
import { mockDeliveries } from "@/lib/mock-data";
import { DeliveryStatus } from "@/types";
import DashboardLayout from "@/components/dashboard/DashBoardLayout";

// Helper component for Status Badges (Odoo style)
const StatusBadge = ({ status }: { status: DeliveryStatus }) => {
  const styles = {
    Draft: "bg-zinc-700 text-zinc-300 border-zinc-600",
    Waiting: "bg-orange-900/30 text-orange-400 border-orange-700",
    Ready: "bg-blue-900/30 text-blue-400 border-blue-700",
    Done: "bg-green-900/30 text-green-400 border-green-700",
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
};

export default function DeliveriesPage() {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // --- Filtering Logic ---
  const filteredDeliveries = useMemo(() => {
    const lowerTerm = searchTerm.toLowerCase();
    return mockDeliveries.filter((order) =>
      order.reference.toLowerCase().includes(lowerTerm) ||
      order.contact.toLowerCase().includes(lowerTerm) ||
      order.destinationLoc.toLowerCase().includes(lowerTerm)
    );
  }, [searchTerm]);

  // --- Selection Logic ---
  const isAllSelected =
    filteredDeliveries.length > 0 &&
    filteredDeliveries.every((d) => selectedIds.has(d.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set()); // Deselect all
    } else {
      // Select all currently visible items
      const newSet = new Set(selectedIds);
      filteredDeliveries.forEach((d) => newSet.add(d.id));
      setSelectedIds(newSet);
    }
  };

  const handleSelectRow = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-gray-900 min-h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="flex justify-end text-3xl mb-8 font-semibold text-gray-100 p-6 pb-0">
          Deliveries Page
        </div>

        {/* TOP CONTROL BAR */}
        <div className="border-b border-gray-700 px-6 py-4 flex flex-col md:flex-row items-center justify-between bg-gray-800 gap-4">
          {/* Left: Title & New Button */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <h1 className="text-lg font-semibold text-gray-100">Delivery</h1>
            <Link
              href="/operations/deliveries/new"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded shadow-sm flex items-center gap-1 transition-colors"
            >
              <Plus size={16} /> New
            </Link>
            {/* Selection Counter (Optional UI enhancement) */}
            {selectedIds.size > 0 && (
              <span className="text-sm text-gray-400 ml-2">
                {selectedIds.size} selected
              </span>
            )}
          </div>

          {/* Right: Search & View Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative group w-full md:w-64">
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-1.5 w-full text-sm border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-all"
              />
            </div>

            <div className="flex items-center border border-gray-600 rounded-md overflow-hidden shrink-0">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200"
                }`}
                title="List View"
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 border-l border-gray-600 transition-colors ${
                  viewMode === "grid"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200"
                }`}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === "list" ? (
            // --- LIST VIEW ---
            <div className="rounded-lg border border-gray-700 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-400 w-10">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={handleSelectAll}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3 font-medium text-gray-400">Reference</th>
                    <th className="px-4 py-3 font-medium text-gray-400">From</th>
                    <th className="px-4 py-3 font-medium text-gray-400">To</th>
                    <th className="px-4 py-3 font-medium text-gray-400">Contact</th>
                    <th className="px-4 py-3 font-medium text-gray-400">Date</th>
                    <th className="px-4 py-3 font-medium text-gray-400 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-900/50">
                  {filteredDeliveries.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => handleSelectRow(order.id)} // Row click toggles selection (optional UX)
                      className={`group transition-colors cursor-pointer ${
                        selectedIds.has(order.id) ? "bg-blue-900/20" : "hover:bg-gray-800/50"
                      }`}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(order.id)}
                          onChange={() => handleSelectRow(order.id)}
                          className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-200 group-hover:text-white">
                        <Link
                          href={`/operations/deliveries/${order.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:underline hover:text-blue-400"
                        >
                          {order.reference}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{order.sourceLoc}</td>
                      <td className="px-4 py-3 text-gray-400">{order.destinationLoc}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-800/50">
                          {order.contact}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{order.scheduleDate}</td>
                      <td className="px-4 py-3 text-right">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))}
                  {/* Empty State */}
                  {filteredDeliveries.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-500">
                        {searchTerm ? "No matching deliveries found" : "No delivery orders found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            // --- GRID VIEW ---
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDeliveries.map((order) => (
                <div
                  key={order.id}
                  onClick={() => handleSelectRow(order.id)}
                  className={`relative rounded-lg border p-4 transition-all cursor-pointer flex flex-col gap-3 ${
                    selectedIds.has(order.id)
                      ? "bg-blue-900/10 border-blue-500/50 shadow-[0_0_0_1px_rgba(59,130,246,0.5)]"
                      : "bg-gray-800 border-gray-700 hover:border-gray-600 hover:shadow-md"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(order.id)}
                        onChange={() => handleSelectRow(order.id)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Link
                        href={`/operations/deliveries/${order.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold text-gray-100 hover:text-blue-400 hover:underline"
                      >
                        {order.reference}
                      </Link>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  <hr className="border-gray-700" />

                  {/* Card Body */}
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-500" />
                      <span className="text-gray-300">{order.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-gray-500" />
                      <div className="flex gap-1 truncate">
                        <span>{order.sourceLoc}</span>
                        <span>→</span>
                        <span className="text-gray-300">{order.destinationLoc}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-500" />
                      <span>{order.scheduleDate}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredDeliveries.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No matching deliveries found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}