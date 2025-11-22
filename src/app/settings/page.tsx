// "use client";

// import DashboardLayout from "@/components/dashboard/DashBoardLayout";
// import Link from "next/link";

// export default function SettingsPage() {
//   return (
//     <DashboardLayout>
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Warehouse Settings Card */}
//           <Link href="/settings/warehouse">
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer group">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
//                   <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-white">Warehouses</h2>
//                   <p className="text-sm text-gray-400">Manage warehouse facilities</p>
//                 </div>
//               </div>
//             </div>
//           </Link>

//           {/* Location Settings Card */}
//           <Link href="/settings/location">
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer group">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
//                   <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-white">Locations</h2>
//                   <p className="text-sm text-gray-400">Manage storage locations</p>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }