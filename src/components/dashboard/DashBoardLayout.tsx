// src/components/dashboard/DashboardLayout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      type: "simple",
    },
    {
      name: "Operations",
      href: "/operations/deliveries",
      type: "dropdown",
      subItems: [
        { name: "Deliveries", href: "/operations/deliveries" },
        { name: "Reciepts", href: "/operations/reciepts" },
      ],
    },
    {
      name: "Stock",
      href: "/stock/",
      type: "simple",
    },
    {
      name: "Move History",
      href: "/history",
      type: "simple",
    },
    {
      name: "Settings",
      href: "/settings",
      type: "dropdown",
      subItems: [
        { name: "Warehouse", href: "/settings/warehouse" },
        { name: "Location", href: "/settings/location" },
      ],
    },
  ];

  const isActive = (href: string, subItems?: Array<{ href: string }>) => {
    if (pathname === href) return true;
    if (subItems) {
      return subItems.some((subItem) => pathname.startsWith(subItem.href));
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navbar */}
      <div className="flex justify-between items-center border-b border-gray-700 px-8 py-4 bg-gray-800 relative">
        {/* Navigation */}
        <div className="flex items-center gap-8 text-lg">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.type === "simple" ? (
                <Link
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? "text-blue-400 font-semibold"
                      : "text-gray-300"
                  } hover:text-white transition-colors px-3 py-2 rounded-md whitespace-nowrap`}
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <button
                    className={`${
                      isActive(item.href, item.subItems)
                        ? "text-blue-400 font-semibold"
                        : "text-gray-300"
                    } hover:text-white transition-colors px-3 py-2 rounded-md flex items-center gap-1 whitespace-nowrap`}
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        hoveredItem === item.name ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {hoveredItem === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-3 text-sm transition-colors ${
                            pathname === subItem.href
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          } first:rounded-t-lg last:rounded-b-lg`}
                          onClick={() => setHoveredItem(null)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Right Icon */}
        <div className="border border-gray-600 px-4 py-2 rounded-lg bg-gray-700 text-white cursor-pointer hover:bg-gray-600 transition-colors whitespace-nowrap">
          A
        </div>
      </div>

      {/* Page Content */}
      <div className="p-6 bg-gray-900 min-h-screen">{children}</div>
    </div>
  );
}
