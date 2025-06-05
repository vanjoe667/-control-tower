import { useEffect } from "react";
import socket from "@/utils/socket.util";
import { SocketChannels } from "@/constants/socket.constants";
import { PaginatedOrder } from "@/interfaces/orders.interface";

export const useOrderStatusSocket = (
  setOrders: React.Dispatch<React.SetStateAction<PaginatedOrder | undefined>>
) => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected to control-tower");
      socket.emit("join", SocketChannels.controlTower.channel);
    });

    socket.on(SocketChannels.controlTower.events.onOrderStatusUpdate, ({ updatedOrder }) => {
        setOrders((prevOrders) => {
        if (!prevOrders) return prevOrders;

        return {
          ...prevOrders,
          data: prevOrders.data.map((order) =>
            order.id === updatedOrder.id
              ? {
                  ...order,
                  bitmarteOrderStatus: {
                    ...order.bitmarteOrderStatus,
                    code_name: updatedOrder.bitmarteOrderStatus.code_name,
                  },
                }
              : order
          ),
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [setOrders]);
};