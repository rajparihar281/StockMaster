// src/components/dashboard/DashboardLayout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Operations", href: "/operations" },
    { name: "Inventory", href: "/inventory/products" },
    { name: "Move History", href: "/operations/transfers" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navbar */}
      <div className="flex justify-between items-center border-b border-gray-700 px-8 py-4 bg-gray-800">
        {/* Navigation */}
        <div className="flex gap-8 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "text-blue-400 font-semibold"
                  : "text-gray-300"
              } hover:text-white transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Icon */}
        <div className="border border-gray-600 px-4 py-2 rounded-lg bg-gray-700 text-white">
          A
        </div>
      </div>

      {/* Page Content */}
      <div className="p-6 bg-gray-900 min-h-screen">{children}</div>
    </div>
  );
}
