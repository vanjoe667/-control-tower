import { useEffect, useState } from "react";
import api from "@/utils/api.util";
import { ProcessedOrder } from "@/interfaces/orders.interface";
import { processOrders } from "@/utils/process-order.util";

export const useFetchOrders = () => {
  const [orders, setOrders] = useState<ProcessedOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        const data = res.data.data;
        setOrders(processOrders(data));

        intervalId = setInterval(() => {
          setOrders((prevOrders) => processOrders(prevOrders));
        }, 1000);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => clearInterval(intervalId);
  }, []);

  return { orders, setOrders, loading };
};