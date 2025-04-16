import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <Flex height="100vh" overflow="hidden">
      <Sidebar />
      <Flex direction="column" flex="1" overflow="hidden">
        <Header />
        <Box as="main" p="4" overflowY="auto" flex="1">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;