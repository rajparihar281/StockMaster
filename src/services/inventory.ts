// src/services/inventory.ts
import { StockLevel } from "@/types";
import { StockLedgerService } from "./stock-ledger";

export class InventoryService {
  static async calculateStockAvailability(
    productId: string,
    warehouseId: string
  ): Promise<StockLevel> {
    return await StockLedgerService.getStockLevel(productId, warehouseId);
  }

  static async checkLowStock(
    threshold: number = 10
  ): Promise<Array<{ productId: string; currentStock: number }>> {
    // This would query all products and check against threshold
    // For now, return mock data
    return [
      { productId: "prod-1", currentStock: 5 },
      { productId: "prod-2", currentStock: 8 },
      { productId: "prod-3", currentStock: 3 },
    ].filter((item) => item.currentStock <= threshold);
  }

  static async getProductsNeedingReorder(): Promise<string[]> {
    const lowStockItems = await this.checkLowStock();
    return lowStockItems.map((item) => item.productId);
  }
}
