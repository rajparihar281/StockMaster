export type DeliveryStatus = 'Draft' | 'Waiting' | 'Ready' | 'Done';

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