import { Order, PaginatedOrder} from "@/interfaces/orders.interface";

export function processOrders(prevOrders: PaginatedOrder): PaginatedOrder {
    const now = Date.now();
  
    const formattedOrders =  prevOrders.data.map((order) => {
      const timeChangedMs = new Date(order.updatedAt).getTime();
      const timePlacedMs = new Date(order.createdAt).getTime();
      const threshold = order.thresholdSeconds ?? 180;
      const orderCompletionThreshold = order.orderCompletionThreshold ?? 180;
  
      const timeSpent = Math.floor((now - timeChangedMs) / 1000);
      const overallElapsedTime = Math.floor((now - timePlacedMs) / 1000);

  
      let thresholdExceededTime = order.thresholdExceededTime ?? null;
  
      if (timeSpent > threshold && !thresholdExceededTime) {
        thresholdExceededTime = now;
      } else if (timeSpent <= threshold) {
        thresholdExceededTime = null;
      }
  
      let flagColor: string | null = null;
      if (timeSpent > threshold) {
        flagColor =
          thresholdExceededTime && now - thresholdExceededTime > 300_000
            ? "red"
            : "yellow";
      }
  
      return {
        ...order,
        timeSpent,
        overallElapsedTime,
        thresholdExceededTime,
        orderCompletionThreshold,
        flagColor,
      };
    });

    return {
      ...prevOrders,
      data: formattedOrders
    }
}

export function processSingleOrder(order: Order): Order {
    const now = Date.now();
  
      const timeChangedMs = new Date(order.updatedAt).getTime();
      const timePlacedMs = new Date(order.createdAt).getTime();
      const threshold = order.thresholdSeconds ?? 180;
      const orderCompletionThreshold = order.orderCompletionThreshold ?? 180;

      const timeSpent = Math.floor((now - timeChangedMs) / 1000);
      const overallElapsedTime = Math.floor((now - timePlacedMs) / 1000);
  
      let thresholdExceededTime = order.thresholdExceededTime ?? null;
  
      if (timeSpent > threshold && !thresholdExceededTime) {
        thresholdExceededTime = now;
      } else if (timeSpent <= threshold) {
        thresholdExceededTime = null;
      }
  
      let flagColor: string | null = null;
      if (timeSpent > threshold) {
        flagColor =
          thresholdExceededTime && now - thresholdExceededTime > 300_000
            ? "red"
            : "yellow";
      }
  
    return {
    ...order,
    timeSpent,
    overallElapsedTime,
    thresholdExceededTime,
    orderCompletionThreshold,
    flagColor,
    };
}