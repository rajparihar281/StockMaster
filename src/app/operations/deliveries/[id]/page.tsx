import Link from "next/link";
import { notFound } from "next/navigation";
import { mockDeliveries } from "@/lib/mock-data";
import { Printer, X, Check, ChevronRight } from "lucide-react";
import { DeliveryStatus } from "@/types";
import DashboardLayout from "@/components/dashboard/DashBoardLayout";

// 1. The Status Pipeline Component (The visual progress bar)
const StatusPipeline = ({
  currentStatus,
}: {
  currentStatus: DeliveryStatus;
}) => {
  const stages: DeliveryStatus[] = ["Draft", "Waiting", "Ready", "Done"];

  return (
    <div className="flex items-center border border-gray-600 rounded-md overflow-hidden bg-gray-700">
      {stages.map((stage, index) => {
        const isActive = stage === currentStatus;
        // In a real app, you'd calculate if a stage is "passed"
        const isPassed = stages.indexOf(currentStatus) > index;

        return (
          <div
            key={stage}
            className={`
              flex items-center px-3 py-1.5 text-sm font-medium relative
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300"
              }
              ${isPassed ? "text-gray-100" : ""}
              ${index !== stages.length - 1 ? "border-r border-gray-600" : ""}
              transition-colors
            `}
          >
            {stage.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
};

export default async function DeliveryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const delivery = mockDeliveries.find((d) => d.id === id);

  if (!delivery) {
    return notFound();
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-gray-900 min-h-screen text-gray-100">
        {/* Header */}
        <div className="flex justify-end text-3xl mb-8 font-semibold text-gray-100 px-6">
          Delivery Details
        </div>

        {/* TOP HEADER: Breadcrumbs & Title */}
        <div className="border-b border-gray-700 px-6 py-4 flex justify-between items-center bg-gray-800">
          <div className="flex flex-col">
            <div className="text-sm text-gray-400 mb-1">
              <Link
                href="/operations/deliveries"
                className="hover:text-blue-400 hover:underline transition-colors"
              >
                Delivery
              </Link>{" "}
              / {delivery.reference}
            </div>
            <h1 className="text-2xl font-bold text-gray-100">
              {delivery.reference}
            </h1>
          </div>
          <StatusPipeline currentStatus={delivery.status} />
        </div>

        {/* ACTION BAR */}
        <div className="px-6 py-3 bg-gray-800 border-b border-gray-700 flex gap-2">
          <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 flex items-center gap-2 transition-colors">
            <Check size={16} /> Validate
          </button>
          <button className="px-4 py-1.5 bg-gray-700 border border-gray-600 text-gray-300 text-sm font-medium rounded hover:bg-gray-600 flex items-center gap-2 transition-colors">
            <Printer size={16} /> Print
          </button>
          <button className="px-4 py-1.5 bg-gray-700 border border-gray-600 text-gray-300 text-sm font-medium rounded hover:bg-gray-600 flex items-center gap-2 transition-colors">
            <X size={16} /> Cancel
          </button>
        </div>

        {/* MAIN FORM CONTENT */}
        <div className="p-8 max-w-5xl">
          {/* Form Grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-12">
            {/* Column 1 */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase mb-1">
                  Delivery Address
                </label>
                <div className="text-base border-b border-gray-600 pb-1 text-gray-300">
                  {delivery.destinationLoc}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase mb-1">
                  Contact
                </label>
                <div className="text-base border-b border-gray-600 pb-1 text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">
                  {delivery.contact}
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase mb-1">
                  Schedule Date
                </label>
                <div className="text-base border-b border-gray-600 pb-1 text-gray-300">
                  {delivery.scheduleDate}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase mb-1">
                  Source Location
                </label>
                <div className="text-base border-b border-gray-600 pb-1 text-gray-300">
                  {delivery.sourceLoc}
                </div>
              </div>
            </div>
          </div>

          {/* Product Lines Tab */}
          <div>
            <div className="border-b border-gray-700 mb-4">
              <span className="inline-block py-2 px-1 border-b-2 border-blue-500 text-sm font-bold text-gray-100">
                Products
              </span>
              <span className="inline-block py-2 px-4 text-sm text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                Additional Info
              </span>
            </div>

            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 font-semibold text-gray-400">Product</th>
                  <th className="py-2 font-semibold text-gray-400 text-right">
                    Reserved
                  </th>
                  <th className="py-2 font-semibold text-gray-400 text-right">
                    Done
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {delivery.lines.length > 0 ? (
                  delivery.lines.map((line) => (
                    <tr
                      key={line.id}
                      className="group hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 text-gray-300">{line.productName}</td>
                      <td className="py-3 text-right text-gray-400">
                        {line.reserved}
                      </td>
                      <td className="py-3 text-right text-gray-400">
                        {line.done}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-8 text-center text-gray-500 italic"
                    >
                      No products added yet.
                    </td>
                  </tr>
                )}
                {/* Add Line Placeholder */}
                <tr>
                  <td
                    colSpan={3}
                    className="py-3 text-blue-400 cursor-pointer hover:text-blue-300 font-medium transition-colors"
                  >
                    + Add a line
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
