import { Spinner, Center, Text, Box } from "@chakra-ui/react";
import OrderTable from "@/components/OrderTable";
import { useFetchOrders, useOrderStatusSocket } from "./hooks";
import ErrorMessage from "./Error";

const OrdersPage = () => {
  const { orders, setOrders, loading, error } = useFetchOrders();
  useOrderStatusSocket(setOrders);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="80vh" flexDirection="column">
        <ErrorMessage />
      </Center>
    );
  }

  if (!(orders?.data?.length)) {
    return (
      <Center h="100vh">
        <Text>No orders found.</Text>
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Orders
      </Text>
      <OrderTable orders={orders} />
    </Box>
  );
};

export default OrdersPage;
