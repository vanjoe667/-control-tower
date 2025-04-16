export interface Order {
  order_id: number;
  orderName: string;
  storeName: string;
  firstName: string;
  lastName: string;
  orderLocation: string;
  address: string;
  code_name: string;
  timeorderplaced: string;
  shippingLocation: {
    city: string;
    state: string;
    street: string;
    country: string;
  };
  timechanged: string;
  thresholdSeconds: number | null;
  orderCompletionThreshold: number | null;
  thresholdExceededTime: number | null;
  flagColor: string | null;
}

export interface ProcessedOrder extends Order {
  timeSpent: number;
  overallElapsedTime: number;
}

export type OrderStatus =
    | "pending"
    | "completed"
    | "cancelled"
    | "3pl_acd"
    | "3pl_assigned"
    | "delivered"
    | "ready_to_ship";