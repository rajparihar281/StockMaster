import { DeliveryOrder } from "@/types";

export const mockDeliveries: DeliveryOrder[] = [
  {
    id: "1",
    reference: "WH/OUT/0001",
    sourceLoc: "WH/Stock",
    destinationLoc: "Customer",
    contact: "Azure Interior",
    scheduleDate: "2023-11-24",
    status: "Ready",
    lines: [
      { id: "p1", productName: "[DESK001] Large Desk", quantity: 10, reserved: 10, done: 0 }
    ]
  },
  {
    id: "2",
    reference: "WH/OUT/0002",
    sourceLoc: "WH/Stock",
    destinationLoc: "Customer",
    contact: "Gemini Corp",
    scheduleDate: "2023-11-25",
    status: "Draft",
    lines: []
  }
];