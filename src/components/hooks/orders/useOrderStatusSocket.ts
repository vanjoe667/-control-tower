import { useEffect } from "react";
import socket from "@/utils/socket.util";
import { SocketChannels } from "@/constants/socket.constants";
import { ProcessedOrder } from "@/interfaces/orders.interface";

export const useOrderStatusSocket = (
  setOrders: React.Dispatch<React.SetStateAction<ProcessedOrder[]>>
) => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected to control-tower");
      socket.emit("join", SocketChannels.controlTower.channel);
    });

    socket.on(SocketChannels.controlTower.events.onOrderStatusUpdate, ({ updatedOrder }) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === updatedOrder.order_id
            ? { ...order, code_name: updatedOrder.code_name }
            : order
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [setOrders]);
};