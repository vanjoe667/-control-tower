import { Box, Text, VStack, Icon, Image } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const isActive = location.pathname === "/order";
  return (
    <Box
      as="nav"
      bg="gray.700"
      color="white"
      w="50"
      p="4"
      display={{ base: "none", md: "block" }}
    >

    <Box mb="6">
        <Image
          src="https://www.bitmarte.com/assets/icons/bitMARTe-logo%203.svg"
          alt="BitMARTE Logo"
          w="170px" 
          objectFit="contain"
        />
    </Box>


      <VStack gap="4" align="start">
        <RouterLink
          to="/"
          style={{ width: "100%" }}
        >
          <Box
            _hover={{ textDecoration: "none", bg: "gray.900" }}
            px="3"
            py="2"
            borderRadius="md"
            w="full"
            bg={isActive ? "gray.800" : "transparent"} 
            fontWeight={isActive ? "bold" : "normal"}
            display="flex" alignItems="center" 
            gap={2}
          >
            <Icon as={FaBoxOpen} />
            <Text>All Orders</Text>
          </Box>
        </RouterLink>

      </VStack>
    </Box>
  );
};

export default Sidebar;