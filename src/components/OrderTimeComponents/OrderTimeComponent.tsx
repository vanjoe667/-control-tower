import { Box, Text } from "@chakra-ui/react";

interface OrderTimeComponentProps {
  orderPlacedTime: string;
}

export const OrderTimeComponent: React.FC<OrderTimeComponentProps> = ({ orderPlacedTime }) => {
  const orderPlacedDate = new Date(orderPlacedTime);

  return (
    <Box>
      <Text fontWeight="bold" color="gray.600">
        Order Placed
      </Text>
      <Text>{orderPlacedDate.toLocaleString()}</Text>
    </Box>
  );
};