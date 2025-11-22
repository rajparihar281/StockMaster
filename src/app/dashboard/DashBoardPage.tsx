import DashboardLayout from "@/components/dashboard/DashBoardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="text-white px-4">
        <div className="flex justify-end text-3xl mb-8 font-semibold text-gray-100">
          Dashboard
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800">
            <h3 className="text-gray-400 text-sm">Total Products</h3>
            <p className="text-2xl font-bold text-white">156</p>
          </div>
          <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800">
            <h3 className="text-gray-400 text-sm">Pending Receipts</h3>
            <p className="text-2xl font-bold text-yellow-400">4</p>
          </div>
          <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800">
            <h3 className="text-gray-400 text-sm">Pending Deliveries</h3>
            <p className="text-2xl font-bold text-blue-400">3</p>
          </div>
          <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800">
            <h3 className="text-gray-400 text-sm">Low Stock Items</h3>
            <p className="text-2xl font-bold text-red-400">7</p>
          </div>
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
