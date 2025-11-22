import DashboardLayout from "@/components/dashboard/DashBoardLayout";


export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="text-white px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-100">Products</h1>
          <button className="border border-green-500 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-colors">
            + Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="border border-gray-700 rounded-2xl p-6 bg-gray-800">
          <table className="w-full text-left">
            <thead className="border-b border-gray-600">
              <tr>
                <th className="pb-3 text-gray-300 font-semibold">Product</th>
                <th className="pb-3 text-gray-300 font-semibold">SKU</th>
                <th className="pb-3 text-gray-300 font-semibold">
                  Per Unit Cost
                </th>
                <th className="pb-3 text-gray-300 font-semibold">On Hand</th>
                <th className="pb-3 text-gray-300 font-semibold">
                  Free to Use
                </th>
                <th className="pb-3 text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-4 text-gray-300">Office Desk</td>
                <td className="py-4 text-gray-300">DESK-001</td>
                <td className="py-4 text-gray-300">3000 Rs</td>
                <td className="py-4 text-gray-300">50</td>
                <td className="py-4 text-gray-300">45</td>
                <td className="py-4">
                  <button className="border border-blue-500 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-colors text-sm mr-2">
                    Edit
                  </button>
                  <button className="border border-red-500 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition-colors text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
