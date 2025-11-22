// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [totalProducts, totalWarehouses, totalCategories, recentMovements] =
      await Promise.all([
        prisma.product.count(),
        prisma.warehouse.count(),
        prisma.category.count(),
        prisma.stockLedger.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
          },
        }),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        totalWarehouses,
        totalCategories,
        recentMovements,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
