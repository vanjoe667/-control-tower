import { Spinner, Center, Text, Alert, AlertIcon, Box } from "@chakra-ui/react";
import OrderTable from "@/components/OrderTable";
import { useFetchOrders, useOrderStatusSocket } from "./hooks";

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
      <Center h="100vh" flexDirection="column">
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
        <Text>Please refresh the page or contact support.</Text>
      </Center>
    );
  }

  if (!orders || !orders.data?.length) {
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
