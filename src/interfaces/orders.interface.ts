export interface Order {
  id: number;
  orderName: string;
  storeName: string;
  firstName: string;
  lastName: string;
  orderLocation: string;
  address: string;
  bitmarteOrderStatus:{
    code_name: string;
    id: string
  };
  shippingLocation: {
    city: string;
    state: string;
    street: string;
    country: string;
  };
  customer:{
    firstName: string;
    id: string;
    lastName: string;
    uniqueId: string;
    customerShippingAddresses: Array<{
      address: string
    }>
  };
  merchant: {
    id: string;
    store: {
      shippingLocation: {
        city: string;
        state: string;
        street: string;
        country: string;
      }
    }
  }
  createdAt: string;
  updatedAt: string;
  thresholdSeconds: number | null;
  orderCompletionThreshold: number | null;
  thresholdExceededTime: number | null;
  flagColor: string | null;
  timeSpent?: number;
  overallElapsedTime?: number;
}

export interface PaginatedOrder {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  data: Array<Order>;
}


export type OrderStatus =
    | "pending"
    | "completed"
    | "cancelled"
    | "3pl_acd"
    | "3pl_assigned"
    | "delivered"
    | "ready_to_ship";