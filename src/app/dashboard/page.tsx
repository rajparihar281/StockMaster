// app/dashboard/page.tsx (App Router)
"use client";

import { useEffect, useState } from "react";

interface Movement {
  id: string;
  quantity: number;
  movementType: string;
  reference?: string;
  product: { name: string };
  warehouse: { name: string };
}

interface WarehouseSummary {
  id: string;
  name: string;
  shortCode: string;
  totalProducts: number;
  totalMovements: number;
}

interface DashboardData {
  kpis: {
    totalProducts: number;
    lowStockItems: number;
    outOfStockItems: number;
    pendingReceipts: number;
    pendingDeliveries: number;
    internalTransfers: number;
  };
  recentMovements: Movement[];
  warehouseSummary: WarehouseSummary[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard");
      const result = await response.json();
      console.log("Dashboard API Response:", result); // Debug log
      if (result.success && result.data) {
        setData(result.data);
      } else {
        console.error("Invalid response format:", result);
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (!data || !data.kpis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">
          Failed to load dashboard data
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">StockMaster Dashboard</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <KPICard
            title="Total Products"
            value={data.kpis?.totalProducts || 0}
            color="blue"
          />
          <KPICard
            title="Low Stock"
            value={data.kpis?.lowStockItems || 0}
            color="yellow"
          />
          <KPICard
            title="Out of Stock"
            value={data.kpis?.outOfStockItems || 0}
            color="red"
          />
          <KPICard
            title="Receipts"
            value={data.kpis?.pendingReceipts || 0}
            color="green"
          />
          <KPICard
            title="Deliveries"
            value={data.kpis?.pendingDeliveries || 0}
            color="purple"
          />
          <KPICard
            title="Transfers"
            value={data.kpis?.internalTransfers || 0}
            color="indigo"
          />
        </div>

        {/* Warehouse Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Warehouse Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Warehouse
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Movements
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.warehouseSummary?.map((warehouse) => (
                  <tr key={warehouse.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {warehouse.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                        {warehouse.shortCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {warehouse.totalProducts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {warehouse.totalMovements}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Movements */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Stock Movements</h2>
          <div className="space-y-3">
            {data.recentMovements?.length > 0 ? (
              data.recentMovements.map((movement) => (
                <div
                  key={movement.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-semibold">{movement.product.name}</div>
                    <div className="text-sm text-gray-600">
                      {movement.warehouse.name} •{" "}
                      {movement.reference || "No reference"}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded ${
                        movement.movementType === "RECEIPT"
                          ? "bg-green-100 text-green-800"
                          : movement.movementType === "DELIVERY"
                          ? "bg-blue-100 text-blue-800"
                          : movement.movementType === "TRANSFER"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {movement.movementType}
                    </span>
                    <span
                      className={`font-bold ${
                        movement.quantity > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {movement.quantity > 0 ? "+" : ""}
                      {movement.quantity}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No recent movements
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div
        className={`w-12 h-12 ${
          colorClasses[color as keyof typeof colorClasses]
        } rounded-lg mb-4`}
      ></div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );
}
