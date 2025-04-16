import { OrderStatus } from "@/interfaces/orders.interface";

export const StatusColor: Record<OrderStatus, string> = {
    pending: "yellow",
    completed: "green",
    cancelled: "red",
    "3pl_acd": "blue",
    "3pl_assigned": "teal",
    ready_to_ship: "green",
    delivered: "green"
  };