import Link from "next/link";
import { Search, LayoutGrid, List, Plus } from "lucide-react";
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
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-gray-900">
        {/* Header */}
        <div className="flex justify-end text-3xl mb-8 font-semibold text-gray-100">
          Deliveries Page
        </div>

        {/* TOP CONTROL BAR */}
        <div className="border-b border-gray-700 px-4 py-2 flex items-center justify-between bg-gray-800">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-100 mr-4">
              Delivery
            </h1>
            <Link
              href="/operations/deliveries/new"
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded shadow-sm flex items-center gap-1 transition-colors"
            >
              <Plus size={16} /> New
            </Link>
          </div>

          {/* Search & View Switcher */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1 w-64 text-sm border border-gray-600 rounded bg-gray-700 text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border border-gray-600 rounded overflow-hidden ml-2">
              <button className="p-1.5 bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                <List size={18} />
              </button>
              <button className="p-1.5 bg-gray-800 text-gray-400 hover:text-gray-300 hover:bg-gray-700 border-l border-gray-600 transition-colors">
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-800 border-b border-gray-700 sticky top-0">
              <tr>
                <th className="px-4 py-2 font-medium text-gray-400 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-2 font-medium text-gray-400">
                  Reference
                </th>
                <th className="px-4 py-2 font-medium text-gray-400">From</th>
                <th className="px-4 py-2 font-medium text-gray-400">To</th>
                <th className="px-4 py-2 font-medium text-gray-400">Contact</th>
                <th className="px-4 py-2 font-medium text-gray-400">
                  Schedule Date
                </th>
                <th className="px-4 py-2 font-medium text-gray-400 text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {mockDeliveries.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-800/50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-100">
                    <Link
                      href={`/operations/deliveries/${order.id}`}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {order.reference}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{order.sourceLoc}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {order.destinationLoc}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    <span className="px-2 py-0.5 bg-indigo-900/30 text-indigo-400 rounded text-xs font-medium border border-indigo-700">
                      {order.contact}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {order.scheduleDate}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
              {/* Empty State Helper */}
              {mockDeliveries.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No delivery orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
