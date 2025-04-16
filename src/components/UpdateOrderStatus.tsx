import { Spinner, Button } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useToast } from "@chakra-ui/toast";
import { Select } from "@chakra-ui/select";
import api from "@/utils/api.util";
import { useState } from "react";
import { OrderStatus } from "@/interfaces/orders.interface";
  
interface Props {
    orderId: number;
    currentStatus: string;
}

const statusOptions: OrderStatus[] = [
    "pending",
    "completed",
    "cancelled",
    "3pl_acd",
    "3pl_assigned",
    "ready_to_ship",
];
    
const UpdateOrderStatus: React.FC<Props> = ({ orderId, currentStatus }) => {
    const toast = useToast();
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);
  
    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
    };

    const handleUpdateStatus = async () => {
        setLoading(true);
        try {
            const res = await api.put(`/orders/${orderId}`, {
                orderStatusId: status,
            });

            const data = res.data.data;
            console.log({ data });

            toast({
                title: "Status Updated",
                description: `Order #${orderId} is now ${status}`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            console.log(err);
            toast({
                title: "Error",
                description: "Failed to update status.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };
  
    return (
      <FormControl w="200px">
        <FormLabel fontSize="sm">Update Status</FormLabel>
        <Select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)} 
          isDisabled={loading}
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>

        <Button 
          mt={2} 
          colorScheme="blue" 
          isLoading={loading} 
          onClick={handleUpdateStatus}
          isDisabled={loading}
        >
          Update Status
        </Button>

        {loading && <Spinner size="sm" mt={2} />}
      </FormControl>
    );
};
  
export default UpdateOrderStatus;