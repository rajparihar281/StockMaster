// src/types/index.ts
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
