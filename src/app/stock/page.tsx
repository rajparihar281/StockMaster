"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const stockData = [
  { product: "Desk", cost: "3000 Rs", onHand: 50, free: 45 },
  { product: "Table", cost: "3000 Rs", onHand: 50, free: 50 }
];

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Operations", href: "/operations" },
  { name: "Products", href: "/products" },
  { name: "Move History", href: "/history" },
  { name: "Settings", href: "/settings" },
];

export default function StockPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
      <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 w-[900px] max-w-full">
        {/* NAVIGATION BAR */}
        <nav className="flex gap-8 text-lg mb-6 border-b border-blue-100 pb-2 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`transition ${
                pathname === item.href
                  ? "text-blue-700 font-semibold underline underline-offset-8"
                  : "text-gray-700 hover:text-blue-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Stock</h1>
          <div className="text-gray-600">
            This page contains the warehouse details &amp; location.
          </div>
        </div>
        {/* Stock Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">per unit cost</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">On hand</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">free to Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {stockData.map((row, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-3 text-blue-600 font-medium">{row.product}</td>
                  <td className="px-6 py-3 text-gray-700">{row.cost}</td>
                  <td className="px-6 py-3 text-gray-700">{row.onHand}</td>
                  <td className="px-6 py-3 text-gray-700">{row.free}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
