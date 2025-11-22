"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashBoardLayout";

// ============================================
// MOCK DATA - WAREHOUSES
// ============================================
const MOCK_WAREHOUSES = [
  {
    id: 1,
    name: "Main Warehouse",
    shortCode: "WH-MAIN",
    address: "123 Industrial Park, District A, New York, NY 10001",
    capacity: "50,000 sq ft",
    currentUtilization: "85%",
    incharge: "John Anderson",
    inchargeEmail: "john.anderson@stockmaster.com",
    inchargePhone: "+1 (555) 123-4567",
    type: "Primary Storage",
    status: "Active",
    operatingHours: "24/7",
    established: "Jan 2020",
    totalLocations: 3,
    activeLocations: 3,
  },
  {
    id: 2,
    name: "Secondary Storage",
    shortCode: "WH-SEC",
    address: "456 Storage Lane, District B, Brooklyn, NY 11201",
    capacity: "30,000 sq ft",
    currentUtilization: "72%",
    incharge: "Sarah Mitchell",
    inchargeEmail: "sarah.mitchell@stockmaster.com",
    inchargePhone: "+1 (555) 234-5678",
    type: "Overflow Storage",
    status: "Active",
    operatingHours: "Mon-Fri 8AM-6PM",
    established: "Mar 2021",
    totalLocations: 2,
    activeLocations: 2,
  },
  {
    id: 3,
    name: "Distribution Center",
    shortCode: "WH-DIST",
    address: "789 Logistics Road, Queens, NY 11368",
    capacity: "75,000 sq ft",
    currentUtilization: "90%",
    incharge: "Michael Chen",
    inchargeEmail: "michael.chen@stockmaster.com",
    inchargePhone: "+1 (555) 345-6789",
    type: "Distribution Hub",
    status: "Active",
    operatingHours: "24/7",
    established: "Jun 2019",
    totalLocations: 3,
    activeLocations: 3,
  },
];

// ============================================
// MOCK LOCATIONS BY WAREHOUSE
// ============================================
const WAREHOUSE_LOCATIONS: Record<number, any[]> = {
  1: [
    { id: 1, name: "Stock Zone A", shortCode: "LOC-A1", capacity: "5,000 sq ft", status: "Active" },
    { id: 2, name: "Stock Zone B", shortCode: "LOC-B1", capacity: "4,500 sq ft", status: "Active" },
    { id: 3, name: "Loading Bay 1", shortCode: "LOC-LB1", capacity: "2,000 sq ft", status: "Active" },
  ],
  2: [
    { id: 4, name: "Rack Section 1", shortCode: "LOC-R1", capacity: "3,000 sq ft", status: "Active" },
    { id: 5, name: "Overflow Area", shortCode: "LOC-OV1", capacity: "5,000 sq ft", status: "Active" },
  ],
  3: [
    { id: 6, name: "Loading Bay", shortCode: "LOC-LB1", capacity: "3,000 sq ft", status: "Active" },
    { id: 7, name: "Sorting Zone", shortCode: "LOC-SZ1", capacity: "8,000 sq ft", status: "Active" },
    { id: 8, name: "Dispatch Area", shortCode: "LOC-DA1", capacity: "4,000 sq ft", status: "Active" },
  ],
};

export default function WarehousePage() {
  const searchParams = useSearchParams();
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Check if warehouse ID is passed from location page
  useEffect(() => {
    const warehouseId = searchParams.get("id");
    if (warehouseId) {
      setSelectedWarehouseId(parseInt(warehouseId));
    }
  }, [searchParams]);

  const selectedWarehouse = selectedWarehouseId
    ? MOCK_WAREHOUSES.find((w) => w.id === selectedWarehouseId)
    : null;

  const locations = selectedWarehouseId ? WAREHOUSE_LOCATIONS[selectedWarehouseId] || [] : [];

  // Filter warehouses for search dropdown
  const filteredWarehouses = MOCK_WAREHOUSES.filter((warehouse) =>
    warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warehouse.shortCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      {/* SEARCH SECTION */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Warehouse Details</h1>
        
        <div className="flex items-center gap-4">
          {/* Search/Select Warehouse */}
          <div className="flex-1 relative">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Search Warehouse
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type warehouse name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 text-sm border border-gray-600 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Dropdown Results */}
            {searchQuery && filteredWarehouses.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredWarehouses.map((warehouse) => (
                  <button
                    key={warehouse.id}
                    onClick={() => {
                      setSelectedWarehouseId(warehouse.id);
                      setSearchQuery("");
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-600 transition-colors border-b border-gray-600 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{warehouse.name}</p>
                        <p className="text-gray-400 text-xs">{warehouse.shortCode}</p>
                      </div>
                      <span className="text-blue-400 text-xs">{warehouse.address}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Warehouse Display */}
          {selectedWarehouse && (
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Selected Warehouse
              </label>
              <div className="h-10 px-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{selectedWarehouse.name}</span>
                  <span className="text-blue-400 text-xs">({selectedWarehouse.shortCode})</span>
                </div>
                <button
                  onClick={() => setSelectedWarehouseId(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WAREHOUSE DETAILS (Only show if warehouse is selected) */}
      {selectedWarehouse ? (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Capacity Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm font-medium">Total Capacity</p>
              </div>
              <p className="text-white text-2xl font-bold">{selectedWarehouse.capacity}</p>
            </div>

            {/* Utilization Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm font-medium">Utilization</p>
              </div>
              <p className="text-white text-2xl font-bold">{selectedWarehouse.currentUtilization}</p>
            </div>

            {/* Total Locations Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm font-medium">Total Locations</p>
              </div>
              <p className="text-white text-2xl font-bold">{selectedWarehouse.totalLocations}</p>
            </div>

            {/* Status Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm font-medium">Status</p>
              </div>
              <p className="text-white text-2xl font-bold">{selectedWarehouse.status}</p>
            </div>
          </div>

          {/* INFORMATION PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* General Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                General Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Warehouse ID</span>
                  <span className="text-white text-sm font-medium">{selectedWarehouse.shortCode}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Warehouse Type</span>
                  <span className="text-white text-sm font-medium">{selectedWarehouse.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Operating Hours</span>
                  <span className="text-white text-sm font-medium">{selectedWarehouse.operatingHours}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Established</span>
                  <span className="text-white text-sm font-medium">{selectedWarehouse.established}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400 text-sm">Address</span>
                  <span className="text-white text-sm font-medium text-right max-w-xs">{selectedWarehouse.address}</span>
                </div>
              </div>
            </div>

            {/* Incharge Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Warehouse Incharge
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {selectedWarehouse.incharge.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{selectedWarehouse.incharge}</p>
                    <p className="text-gray-400 text-sm">Warehouse Manager</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300">{selectedWarehouse.inchargeEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-300">{selectedWarehouse.inchargePhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATIONS TABLE */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Storage Locations ({locations.length})
            </h2>

            {locations.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Location Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Short Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Capacity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {locations.map((location) => (
                      <tr key={location.id} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{location.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold text-purple-400 bg-purple-500/10 rounded border border-purple-500/30">
                            {location.shortCode}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{location.capacity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold text-green-400 bg-green-500/10 rounded border border-green-500/30">
                            {location.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No locations found in this warehouse</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* EMPTY STATE - No warehouse selected */
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Warehouse Selected</h3>
          <p className="text-gray-400 text-sm">
            Search and select a warehouse above to view its details
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}