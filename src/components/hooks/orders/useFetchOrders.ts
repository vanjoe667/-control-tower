import { useEffect, useState } from "react";
import api from "@/utils/api.util";
import { PaginatedOrder } from "@/interfaces/orders.interface";
import { processOrders } from "@/utils/process-order.util";

export const useFetchOrders = () => {
  const [orders, setOrders] = useState<PaginatedOrder>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        const data = res.data.data as PaginatedOrder;
        setOrders(processOrders(data));

        intervalId = setInterval(() => {
          setOrders((prevOrders) => processOrders(prevOrders!));
        }, 1000);
      } catch (err: unknown) {
        console.error("Failed to fetch orders", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => clearInterval(intervalId);
  }, []);

  return { orders, setOrders, loading, error };
};
