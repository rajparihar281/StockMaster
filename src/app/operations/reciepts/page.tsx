"use client";
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  ChartPieIcon,
  ChartBarIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import DashboardLayout from "@/components/dashboard/DashBoardLayout";
// Reusable tokens for clean classNames
const pageBg = "bg-[#0F172A] text-gray-200";
const card =
  "bg-[#1E293B] border border-[#334155] shadow-lg shadow-black/20 rounded-xl";
const hoverSoft = "hover:bg-[#243044]";
const inputBox =
  "w-full pl-10 pr-3 py-2 rounded-lg border border-[#334155] bg-[#1E293B] " +
  "text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 " +
  "focus:ring-blue-500 focus:border-blue-500";

const toggleBtn =
  "px-4 py-2 text-sm font-medium border border-[#334155] rounded-lg " +
  "bg-[#1E293B] text-gray-300";
const toggleActive = "bg-blue-900/40 text-blue-400 border-blue-500";

export default function DarkReceiptsPage() {
  const [activeView, setActiveView] = useState("All");

  return (
      <DashboardLayout>  
    <div className={`min-h-screen ${pageBg}`}>
      {/* TOP NAV */}
  


      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* PAGE TITLE */}
        <h1 className="text-2xl font-semibold text-white mb-8">Receipts</h1>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            { title: "Total Receipts", value: "312", icon: ChartPieIcon },
            { title: "This Month", value: "28", icon: ChartBarIcon },
            { title: "Pending Reviews", value: "4", icon: ChevronRightIcon },
          ].map((stat, i) => (
            <div key={i} className={card}>
              <div className="px-6 py-5 flex items-center gap-4">
                <stat.icon className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-semibold text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH + VIEW FILTER */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* SEARCH */}
          <div className="relative w-full md:w-1/3">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search receipts…"
              className={inputBox}
            />
          </div>

          {/* VIEW TOGGLE */}
          <div className="flex gap-3">
            {["All", "Paid", "Pending", "Overdue"].map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`${toggleBtn} ${
                  activeView === v ? toggleActive : ""
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* RECEIPT LIST (EXAMPLE DATA) */}
        <div className="space-y-4">
          {[
            {
              name: "Amazon Purchase",
              date: "Nov 21, 2025",
              amount: "₹2,499",
              status: "Paid",
            },
            {
              name: "Electricity Bill",
              date: "Nov 19, 2025",
              amount: "₹1,320",
              status: "Pending",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`${card} px-6 py-5 flex justify-between items-center ${hoverSoft}`}
            >
              <div>
                <p className="text-base font-medium text-white">{item.name}</p>
                <p className="text-gray-400 text-sm">{item.date}</p>
              </div>
              <div className="text-right">
                <p className="text-white text-lg font-semibold">
                  {item.amount}
                </p>
                <p
                  className={`text-sm ${
                    item.status === "Paid"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    </DashboardLayout>
  );
}
