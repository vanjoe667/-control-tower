import { Spinner, Center, Text } from "@chakra-ui/react";
import OrderTable from "@/components/OrderTable";
import { useFetchOrders, useOrderStatusSocket } from "./hooks";

const OrdersPage = () => {
  const { orders, setOrders, loading } = useFetchOrders();
  useOrderStatusSocket(setOrders);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <div>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Orders
      </Text>
      <OrderTable orders={orders!} />
    </div>
  );
};

export default OrdersPage;