import DashboardLayout from "@/components/dashboard/DashBoardLayout";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="text-white px-4">
        <div className="flex justify-end text-3xl mb-8 font-semibold text-gray-100">
          Dashboard Page
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Products Card */}
          <Link href="/products">
            <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
              <h3 className="text-gray-400 text-sm">Total Products</h3>
              <p className="text-2xl font-bold text-white">156</p>
            </div>
          </Link>

          {/* Pending Receipts Card */}
          <Link href="/receipts">
            <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
              <h3 className="text-gray-400 text-sm">Pending Receipts</h3>
              <p className="text-2xl font-bold text-yellow-400">4</p>
            </div>
          </Link>

          {/* Pending Deliveries Card */}
          <Link href="/deliveries">
            <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
              <h3 className="text-gray-400 text-sm">Pending Deliveries</h3>
              <p className="text-2xl font-bold text-blue-400">3</p>
            </div>
          </Link>

          {/* Low Stock Items Card */}
          <Link href="/inventory">
            <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
              <h3 className="text-gray-400 text-sm">Low Stock Items</h3>
              <p className="text-2xl font-bold text-red-400">7</p>
            </div>
          </Link>
        </div>

        {/* Additional Cards based on your image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Stocks Card */}
          <Link href="/stocks">
            <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">
                Stocks
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Receipt:</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-300">To receive:</span>
                    <span className="text-white">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Late:</span>
                    <span className="text-red-400">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Operations:</span>
                    <span className="text-white">6</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Delivery Card */}
          <Link href="/operations/deliveries">
            <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">
                Delivery
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery:</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-300">To deliver:</span>
                    <span className="text-white">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Late:</span>
                    <span className="text-red-400">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Waiting:</span>
                    <span className="text-yellow-400">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Operations:</span>
                    <span className="text-white">6</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800">
          <h2 className="text-2xl font-semibold mb-4 text-gray-100">
            Recent Stock Movements
          </h2>
          {/* Recent moves table will go here */}
        </div>
      </div>
    </DashboardLayout>
  );
}
