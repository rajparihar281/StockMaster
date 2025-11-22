export interface Product {
  id: string;
  name: string;
  sku: string;
  description?: string;
  perUnitCost: number;
  categoryId: string;
  warehouseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StockLedger {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  movementType: MovementType;
  reference: string;
  createdAt: Date;
}

export interface Warehouse {
  id: string;
  name: string;
  shortCode: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface StockLevel {
  productId: string;
  warehouseId: string;
  onHand: number;
  freeToUse: number;
  allocated: number;
}

// Add the MovementType enum
export enum MovementType {
  RECEIPT = "RECEIPT",
  DELIVERY = "DELIVERY",
  TRANSFER = "TRANSFER",
  ADJUSTMENT = "ADJUSTMENT",
}
export type DeliveryStatus = "Draft" | "Waiting" | "Ready" | "Done";

export interface ProductLine {
  id: string;
  productName: string;
  quantity: number;
  reserved: number;
  done: number;
}

export interface DeliveryOrder {
  id: string;
  reference: string; // eUX: WH/OUT/0001
  sourceLoc: string; // e.g., WH/Stock
  destinationLoc: string; // e.g., Customer
  contact: string; // e.g., Azure Interior
  scheduleDate: string;
  status: DeliveryStatus;
  lines: ProductLine[];
}
export interface ReceiptOrder {
  id: string;
  reference: string; // e.g., WH/IN/0001
  sourceLoc: string; // e.g., Vendor
  destinationLoc: string; // e.g., WH/Stock
  contact: string; // e.g., Supplier Name
  scheduleDate: string;
  status: DeliveryStatus;
  lines: ProductLine[];
}       