import Link from "next/link";
import { notFound } from "next/navigation";
import { mockDeliveries } from "@/lib/mock-data";
import { Printer, X, Check, ChevronRight } from "lucide-react";
import { DeliveryStatus } from "@/types";

// 1. The Status Pipeline Component (The visual progress bar)
const StatusPipeline = ({ currentStatus }: { currentStatus: DeliveryStatus }) => {
  const stages: DeliveryStatus[] = ["Draft", "Waiting", "Ready", "Done"];
  
  return (
    <div className="flex items-center border border-zinc-300 rounded-md overflow-hidden bg-white">
      {stages.map((stage, index) => {
        const isActive = stage === currentStatus;
        // In a real app, you'd calculate if a stage is "passed"
        const isPassed = stages.indexOf(currentStatus) > index; 
        
        return (
          <div
            key={stage}
            className={`
              flex items-center px-3 py-1.5 text-sm font-medium relative
              ${isActive ? "bg-zinc-800 text-white" : "bg-white text-zinc-600"}
              ${isPassed ? "text-zinc-900" : ""}
              ${index !== stages.length - 1 ? "border-r border-zinc-200" : ""}
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
    <div className="flex flex-col h-full bg-white min-h-screen text-zinc-900">
      {/* TOP HEADER: Breadcrumbs & Title */}
      <div className="border-b border-zinc-200 px-6 py-4 flex justify-between items-center bg-white">
        <div className="flex flex-col">
          <div className="text-sm text-zinc-500 mb-1">
            <Link href="/operations/deliveries" className="hover:underline">Delivery</Link> / {delivery.reference}
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">{delivery.reference}</h1>
        </div>
        <StatusPipeline currentStatus={delivery.status} />
      </div>

      {/* ACTION BAR */}
      <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-200 flex gap-2">
        <button className="px-4 py-1.5 bg-zinc-900 text-white text-sm font-medium rounded hover:bg-zinc-800 flex items-center gap-2">
          <Check size={16} /> Validate
        </button>
        <button className="px-4 py-1.5 bg-white border border-zinc-300 text-zinc-700 text-sm font-medium rounded hover:bg-zinc-50 flex items-center gap-2">
          <Printer size={16} /> Print
        </button>
        <button className="px-4 py-1.5 bg-white border border-zinc-300 text-zinc-700 text-sm font-medium rounded hover:bg-zinc-50 flex items-center gap-2">
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
              <label className="text-xs font-bold text-zinc-500 uppercase mb-1">Delivery Address</label>
              <div className="text-base border-b border-zinc-200 pb-1">{delivery.destinationLoc}</div>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-zinc-500 uppercase mb-1">Contact</label>
              <div className="text-base border-b border-zinc-200 pb-1 text-indigo-600 cursor-pointer">
                {delivery.contact}
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-zinc-500 uppercase mb-1">Schedule Date</label>
              <div className="text-base border-b border-zinc-200 pb-1">{delivery.scheduleDate}</div>
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-zinc-500 uppercase mb-1">Source Location</label>
              <div className="text-base border-b border-zinc-200 pb-1">{delivery.sourceLoc}</div>
            </div>
          </div>
        </div>

        {/* Product Lines Tab */}
        <div>
          <div className="border-b border-zinc-200 mb-4">
            <span className="inline-block py-2 px-1 border-b-2 border-zinc-900 text-sm font-bold text-zinc-900">
              Products
            </span>
            <span className="inline-block py-2 px-4 text-sm text-zinc-500 cursor-pointer hover:text-zinc-700">
              Additional Info
            </span>
          </div>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="py-2 font-semibold text-zinc-600">Product</th>
                <th className="py-2 font-semibold text-zinc-600 text-right">Reserved</th>
                <th className="py-2 font-semibold text-zinc-600 text-right">Done</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {delivery.lines.length > 0 ? (
                delivery.lines.map((line) => (
                  <tr key={line.id} className="group">
                    <td className="py-3 text-zinc-900">{line.productName}</td>
                    <td className="py-3 text-right text-zinc-600">{line.reserved}</td>
                    <td className="py-3 text-right text-zinc-600">{line.done}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-zinc-400 italic">
                    No products added yet.
                  </td>
                </tr>
              )}
              {/* Add Line Placeholder */}
              <tr>
                <td colSpan={3} className="py-3 text-indigo-600 cursor-pointer hover:text-indigo-700 font-medium">
                  + Add a line
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}