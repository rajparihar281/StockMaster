"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashBoardLayout";

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
  <DashboardLayout>          <h1 className="text-2xl font-bold text-gray-800">Stock</h1>
  
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
    </DashboardLayout>  

  );
}
