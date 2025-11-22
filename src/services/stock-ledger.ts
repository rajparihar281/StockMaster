import { StockLedger, MovementType, StockLevel } from "@/types";

// Mock data for demonstration - replace with actual database calls
const mockStockLedger: StockLedger[] = [];

export class StockLedgerService {
  static async logMovement(
    productId: string,
    warehouseId: string,
    quantity: number,
    movementType: MovementType,
    reference?: string
  ): Promise<StockLedger> {
    // Create new stock movement record
    const newMovement: StockLedger = {
      id: `movement-${Date.now()}`,
      productId,
      warehouseId,
      quantity,
      movementType,
      reference: reference || "",
      createdAt: new Date(),
    };

    // In a real application, this would be a database insert
    mockStockLedger.push(newMovement);

    console.log("Stock movement logged:", newMovement);

    return newMovement;
  }

  static async getStockLevel(
    productId: string,
    warehouseId: string
  ): Promise<StockLevel> {
    // Calculate current stock levels from ledger entries
    const movements = mockStockLedger.filter(
      (movement) =>
        movement.productId === productId && movement.warehouseId === warehouseId
    );

    const onHand = movements.reduce((total, movement) => {
      switch (movement.movementType) {
        case MovementType.RECEIPT:
        case MovementType.ADJUSTMENT:
          return total + movement.quantity;
        case MovementType.DELIVERY:
        case MovementType.TRANSFER:
          return total - movement.quantity;
        default:
          return total;
      }
    }, 0);

    // For demo purposes, freeToUse is 90% of onHand, allocated is 10%
    const freeToUse = Math.floor(onHand * 0.9);
    const allocated = onHand - freeToUse;

    return {
      productId,
      warehouseId,
      onHand,
      freeToUse,
      allocated,
    };
  }

  static async getMovementHistory(
    productId?: string,
    warehouseId?: string
  ): Promise<StockLedger[]> {
    let movements = mockStockLedger;

    if (productId) {
      movements = movements.filter(
        (movement) => movement.productId === productId
      );
    }

    if (warehouseId) {
      movements = movements.filter(
        (movement) => movement.warehouseId === warehouseId
      );
    }

    return movements.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}
