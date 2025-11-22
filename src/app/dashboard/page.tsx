"use client";

import DashboardLayout from "@/components/dashboard/DashBoardLayout";

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

// Mock Data Configuration
const MOCK_DATA: DashboardData = {
  kpis: {
    totalProducts: 156,
    lowStockItems: 12,
    outOfStockItems: 5,
    pendingReceipts: 8,
    pendingDeliveries: 14,
    internalTransfers: 3,
  },
  warehouseSummary: [
    {
      id: "wh-1",
      name: "Main Warehouse",
      shortCode: "WH-MAIN",
      totalProducts: 120,
      totalMovements: 450,
    },
    {
      id: "wh-2",
      name: "Production Floor",
      shortCode: "WH-PROD",
      totalProducts: 45,
      totalMovements: 120,
    },
    {
      id: "wh-3",
      name: "Distribution Center",
      shortCode: "WH-DIST",
      totalProducts: 80,
      totalMovements: 310,
    },
  ],
  recentMovements: [
    {
      id: "m-1",
      product: { name: "Steel Rods 6mm" },
      warehouse: { name: "Main Warehouse" },
      reference: "PO-2024-001",
      movementType: "RECEIPT",
      quantity: 500,
    },
    {
      id: "m-2",
      product: { name: "Office Chair" },
      warehouse: { name: "Main Warehouse" },
      reference: "SO-2024-005",
      movementType: "DELIVERY",
      quantity: -10,
    },
    {
      id: "m-3",
      product: { name: "LED Bulb 12W" },
      warehouse: { name: "Production Floor" },
      reference: "TR-001-IN",
      movementType: "TRANSFER",
      quantity: 100,
    },
    {
      id: "m-4",
      product: { name: "Aluminum Sheets" },
      warehouse: { name: "Main Warehouse" },
      reference: "ADJ-003",
      movementType: "ADJUSTMENT",
      quantity: -5,
    },
    {
      id: "m-5",
      product: { name: "Office Desk" },
      warehouse: { name: "Distribution Center" },
      reference: "SO-2024-008",
      movementType: "DELIVERY",
      quantity: -2,
    },
  ],
};

export default function Dashboard() {
  // Using static data directly
  const data = MOCK_DATA;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">
            StockMaster Dashboard
          </h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KPICard
            title="Total Products"
            value={data.kpis.totalProducts}
            color="blue"
          />
          <KPICard
            title="Low Stock"
            value={data.kpis.lowStockItems}
            color="yellow"
          />
          <KPICard
            title="Out of Stock"
            value={data.kpis.outOfStockItems}
            color="red"
          />
          <KPICard
            title="Receipts"
            value={data.kpis.pendingReceipts}
            color="green"
          />
          <KPICard
            title="Deliveries"
            value={data.kpis.pendingDeliveries}
            color="purple"
          />
          <KPICard
            title="Transfers"
            value={data.kpis.internalTransfers}
            color="indigo"
          />
        </div>

        {/* Warehouse Summary */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              Warehouse Summary
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Movements
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {data.warehouseSummary.map((warehouse) => (
                  <tr
                    key={warehouse.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {warehouse.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 text-xs bg-blue-900/50 text-blue-400 rounded border border-blue-800">
                        {warehouse.shortCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {warehouse.totalProducts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {warehouse.totalMovements}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Movements */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Movements
          </h2>
          <div className="space-y-3">
            {data.recentMovements.map((movement) => (
              <div
                key={movement.id}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div>
                  <div className="font-medium text-white">
                    {movement.product.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {movement.warehouse.name} • {movement.reference}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-2 py-1 text-xs rounded bg-gray-600 text-gray-300`}
                  >
                    {movement.movementType}
                  </span>
                  <span
                    className={`font-bold ${
                      movement.quantity > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {movement.quantity > 0 ? "+" : ""}
                    {movement.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

type KPIColor = "blue" | "yellow" | "red" | "green" | "purple" | "indigo";

interface KPICardProps {
  title: string;
  value: number;
  color: KPIColor;
}

function KPICard({ title, value, color }: KPICardProps) {
  const colors: Record<KPIColor, string> = {
    blue: "border-blue-500/30 bg-blue-500",
    yellow: "border-yellow-500/30 bg-yellow-500",
    red: "border-red-500/30 bg-red-500",
    green: "border-green-500/30 bg-green-500",
    purple: "border-purple-500/30 bg-purple-500",
    indigo: "border-indigo-500/30 bg-indigo-500",
  };

  const colorClass = colors[color];
  const [borderClass, bgClass] = colorClass
    ? colorClass.split(" ")
    : ["border-gray-600", "bg-gray-600"];

  return (
    <div
      className={`bg-gray-800 border ${borderClass} rounded-lg shadow-lg p-6`}
    >
      <div className={`w-10 h-10 rounded-lg mb-4 opacity-80 ${bgClass}`}></div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-400">{title}</div>
    </div>
  );
}
