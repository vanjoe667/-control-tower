import {
    Table, Thead, Tbody, Tr, Th, Td,
  } from "@chakra-ui/table";
import {
    Badge, Box, Text, Input, Select, Flex, Button,
  } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { OrderStatus, ProcessedOrder } from "@/interfaces/orders.interface";
import { formatDateTime } from "@/utils/manipulate-time.util";
import TimeSpentComponent from "./OrderTimeComponents/TimeSpentComponent";
import OverallElapsedTimeComponent from "./OrderTimeComponents/OverallElapsedTimeComponent";
import { useNavigate } from "react-router-dom";
import { StatusColor } from "@/constants/orders.constants";
  
interface OrderTableProps {
    orders: ProcessedOrder[];
}
  
const ITEMS_PER_PAGE = 10;

const OrderTable = ({ orders }: OrderTableProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(1);
  
    const navigate = useNavigate();
    const handleRowClick = (orderId: string) => {
        navigate(`/order/${orderId}`);
    };

    const filteredOrders = useMemo(() => {

      return orders
        .filter((order) =>
          [order.order_id, order.orderName, order.storeName]
            .some((field) =>
              field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        .filter((order) =>
          statusFilter ? order.code_name === statusFilter : true
        );
    }, [orders, searchTerm, statusFilter]);
  
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const paginatedOrders = filteredOrders.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  
    return (
      <Box>
        <Flex mb={4} gap={4} direction={{ base: "column", md: "row" }}>
          <Input
            placeholder="Search by ID, Name, or Merchant"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            {Object.keys(StatusColor).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
        </Flex>
  
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" shadow="sm">
          <Table size="sm" variant="striped" colorScheme="gray">
            <Thead bg="black">
              <Tr>
                {[
                  "Order ID",
                  "Order Name",
                  "Merchant",
                  "Merchant City",
                  "Pickup Location",
                  "Destination",
                  "Date",
                  "Status",
                  "Time on Status",
                  "Overall Elapsed Time",
                ].map((heading) => (
                  <Th key={heading} color="white">
                    {heading}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {paginatedOrders.length === 0 ? (
                <Tr>
                  <Td colSpan={10}>
                    <Text textAlign="center" py="4" color="gray.500">
                      No orders available
                    </Text>
                  </Td>
                </Tr>
              ) : (
                paginatedOrders.map((order) => (
                  <Tr key={order.order_id} onClick={() => handleRowClick(String(order.order_id))} style={{ cursor: 'pointer' }}>
                    <Td>{order.order_id}</Td>
                    <Td>{order.orderName}</Td>
                    <Td>{order.storeName}</Td>
                    <Td>{order?.shippingLocation?.state || "N/A"}</Td>
                    <Td>{order.orderLocation}</Td>
                    <Td>{order.address}</Td>
                    <Td>{formatDateTime(order.timeorderplaced)}</Td>
                    <Td>
                      <Badge colorScheme={StatusColor[order.code_name as OrderStatus]}>
                        {order.code_name}
                      </Badge>
                    </Td>
                    <TimeSpentComponent
                      timeSpent={order.timeSpent}
                      flagColor={order.flagColor!}
                    />
                    <OverallElapsedTimeComponent
                      overallElapsedTime={order.overallElapsedTime}
                      orderCompletionThreshold={order.orderCompletionThreshold!}
                    />
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Box>
  
        {totalPages > 1 && (
          <Flex mt={4} justify="space-between" align="center">
            <Text fontSize="sm">
              Page {page} of {totalPages}
            </Text>
            <Flex gap={2}>
              <Button
                size="sm"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              <Button
                size="sm"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </Flex>
          </Flex>
        )}
      </Box>
    );
  };
  
  export default OrderTable;