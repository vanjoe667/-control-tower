import { Order, ProcessedOrder } from "@/interfaces/orders.interface";

export function processOrders(prevOrders: Order[]): ProcessedOrder[] {
    const now = Date.now();
  
    return prevOrders.map((order) => {
      const timeChangedMs = new Date(order.timechanged).getTime();
      const timePlacedMs = new Date(order.timeorderplaced).getTime();
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
}

export function processSingleOrder(order: Order): ProcessedOrder {
    const now = Date.now();
  
      const timeChangedMs = new Date(order.timechanged).getTime();
      const timePlacedMs = new Date(order.timeorderplaced).getTime();
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