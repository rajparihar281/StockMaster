import Link from "next/link";
import { Search, LayoutGrid, List, Plus } from "lucide-react";
import { mockDeliveries } from "@/lib/mock-data";
import { DeliveryStatus } from "@/types";

// Helper component for Status Badges (Odoo style)
const StatusBadge = ({ status }: { status: DeliveryStatus }) => {
  const styles = {
    Draft: "bg-zinc-100 text-zinc-600 border-zinc-200",
    Waiting: "bg-orange-50 text-orange-600 border-orange-200",
    Ready: "bg-blue-50 text-blue-600 border-blue-200",
    Done: "bg-green-50 text-green-600 border-green-200",
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
    <div className="flex flex-col h-full bg-white">
      {/* TOP CONTROL BAR */}
      <div className="border-b border-zinc-200 px-4 py-2 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-zinc-800 mr-4">Delivery</h1>
          <Link
            href="/operations/deliveries/new"
            className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-white text-sm rounded shadow-sm flex items-center gap-1"
          >
            <Plus size={16} /> New
          </Link>
        </div>

        {/* Search & View Switcher */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-1 w-64 text-sm border border-zinc-300 rounded focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500"
            />
          </div>
          <div className="flex items-center border border-zinc-300 rounded overflow-hidden ml-2">
            <button className="p-1.5 bg-zinc-100 text-zinc-600 hover:bg-zinc-50">
              <List size={18} />
            </button>
            <button className="p-1.5 bg-white text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 border-l border-zinc-300">
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200 sticky top-0">
            <tr>
              <th className="px-4 py-2 font-medium text-zinc-500 w-10">
                <input type="checkbox" className="rounded border-zinc-300" />
              </th>
              <th className="px-4 py-2 font-medium text-zinc-500">Reference</th>
              <th className="px-4 py-2 font-medium text-zinc-500">From</th>
              <th className="px-4 py-2 font-medium text-zinc-500">To</th>
              <th className="px-4 py-2 font-medium text-zinc-500">Contact</th>
              <th className="px-4 py-2 font-medium text-zinc-500">
                Schedule Date
              </th>
              <th className="px-4 py-2 font-medium text-zinc-500 text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {mockDeliveries.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-zinc-300" />
                </td>
                <td className="px-4 py-3 font-medium text-zinc-900">
                  <Link href={`/operations/deliveries/${order.id}`}>
                    {order.reference}
                  </Link>
                </td>
                <td className="px-4 py-3 text-zinc-600">{order.sourceLoc}</td>
                <td className="px-4 py-3 text-zinc-600">
                  {order.destinationLoc}
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                    {order.contact}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-600">
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
                <td colSpan={7} className="text-center py-10 text-zinc-400">
                  No delivery orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}