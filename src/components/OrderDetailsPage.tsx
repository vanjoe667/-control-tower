import { Box, Flex, Text, Badge, Stack, useToast } from "@chakra-ui/react";
import { OrderTimeComponent } from "./OrderTimeComponents/OrderTimeComponent";
import TimeSpentComponent  from "./OrderTimeComponents/TimeSpentComponent";
import OverallElapsedTimeComponent from "./OrderTimeComponents/OverallElapsedTimeComponent";
import { Order, OrderStatus } from "@/interfaces/orders.interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/utils/api.util";
import { processSingleOrder } from "@/utils/process-order.util";
import { StatusColor } from "@/constants/orders.constants";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${orderId}`);
        const data = response.data.data as Order;

        setOrder(processSingleOrder(data));
        const intervalId = setInterval(() => {
          setOrder((prevOrder) => processSingleOrder(prevOrder!));
        }, 1000);
    
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch order details. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, toast]);

  if (!order) {
    return <div>Loading...</div>;
  }
  
  return (
    <Flex
      direction="column"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      mb={4}
      bg="white"
      boxShadow="sm"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {order.storeName} — {order.orderName}
          </Text>
          <Text color="gray.600" fontSize="sm">
            {order.firstName} {order.lastName}
          </Text>
        </Box>
        <Badge colorScheme={StatusColor[order.bitmarteOrderStatus.code_name as OrderStatus]}>
          {order.bitmarteOrderStatus.code_name}
        </Badge>
      </Flex>

      <Text fontSize="sm" mb={2} color="gray.700">
        📍 <strong>{order.orderLocation}</strong> — {order.address}
      </Text>

      <Flex direction={{ base: "column", md: "row" }} gap={4} align="center" justify="space-between">
        <Stack direction="row" gap={6} wrap="wrap">
          <OrderTimeComponent orderPlacedTime={order.createdAt} />
          <TimeSpentComponent 
            timeSpent={order.timeSpent!}
            flagColor={order.flagColor!}
            isTable={false}
           />

          <OverallElapsedTimeComponent
            overallElapsedTime={order.overallElapsedTime!}
            orderCompletionThreshold={order.orderCompletionThreshold!}
            isTable={false}
          />
        </Stack>

        {/* {order.code_name.toLowerCase() !== 'delivered' && (
          <UpdateOrderStatus orderId={order.order_id} currentStatus={order.code_name} />
        )} */}
      </Flex>
    </Flex>
  );
};

export default OrderDetailsPage;