// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db";
// import { MovementType } from "@prisma/client"; // Import enum for type safety

// // Force dynamic rendering to ensure fresh data on every request
// export const dynamic = "force-dynamic";

// export async function GET() {
//   console.log("SERVER: Starting GET /api/dashboard...");

//   try {
//     // 1. Test DB Connection
//     try {
//       await prisma.$queryRaw`SELECT 1`;
//       console.log("SERVER: Database connection successful");
//     } catch (dbError) {
//       console.error("SERVER: Database connection FAILED:", dbError);
//       return NextResponse.json(
//         { success: false, error: "Database connection failed" },
//         { status: 500 }
//       );
//     }

//     // 2. KPIs
//     console.log("SERVER: Fetching KPIs...");
//     const totalProducts = await prisma.product.count();

//     const stockLevels = await prisma.stockLedger.groupBy({
//       by: ["productId"],
//       _sum: { quantity: true },
//     });

//     let lowStockItems = 0;
//     let outOfStockItems = 0;
//     const LOW_STOCK_THRESHOLD = 10;

//     stockLevels.forEach((item) => {
//       const currentQty = item._sum.quantity || 0;
//       if (currentQty <= 0) outOfStockItems++;
//       else if (currentQty < LOW_STOCK_THRESHOLD) lowStockItems++;
//     });

//     // 3. Warehouse Summary
//     console.log("SERVER: Fetching Warehouse Summary...");
//     const warehouses = await prisma.warehouse.findMany({
//       include: {
//         _count: {
//           select: { products: true, stockLedgers: true },
//         },
//       },
//     });

//     const warehouseSummary = warehouses.map((w) => ({
//       id: w.id,
//       name: w.name,
//       shortCode: w.shortCode,
//       totalProducts: w._count.products,
//       totalMovements: w._count.stockLedgers,
//     }));

//     // 4. Recent Movements
//     console.log("SERVER: Fetching Recent Movements...");
//     const recentMovementsData = await prisma.stockLedger.findMany({
//       take: 5,
//       orderBy: { createdAt: "desc" },
//       include: {
//         product: { select: { name: true } },
//         warehouse: { select: { name: true } },
//       },
//     });

//     const recentMovements = recentMovementsData.map((m) => ({
//       id: m.id,
//       quantity: m.quantity,
//       movementType: m.movementType,
//       reference: m.reference || "",
//       product: { name: m.product.name },
//       warehouse: { name: m.warehouse.name },
//     }));

//     const internalTransfers = await prisma.stockLedger.count({
//       where: { movementType: MovementType.TRANSFER }, // Use Enum here
//     });

//     const responseData = {
//       kpis: {
//         totalProducts,
//         lowStockItems,
//         outOfStockItems,
//         pendingReceipts: 0,
//         pendingDeliveries: 0,
//         internalTransfers,
//       },
//       recentMovements,
//       warehouseSummary,
//     };

//     console.log("SERVER: Success. Sending data.");
//     return NextResponse.json({
//       success: true,
//       data: responseData,
//     });
//   } catch (error) {
//     // Type assertion for error handling
//     const errorMessage =
//       error instanceof Error ? error.message : "Internal Server Error";
//     console.error("SERVER ERROR in /api/dashboard:", error);
//     return NextResponse.json(
//       { success: false, error: errorMessage },
//       { status: 500 }
//     );
//   }
// }
