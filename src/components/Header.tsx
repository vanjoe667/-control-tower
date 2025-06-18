import {
  Flex,
  Heading,
  Spacer,
  Icon,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { FaBinoculars, FaSignOutAlt } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px="6"
      py="4"
      bg="white"
      boxShadow="sm"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <HStack spacing={2}>
        <Icon as={FaBinoculars} />
        <Heading size="md">Control Tower</Heading>
      </HStack>

      <Spacer />

      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          rightIcon={<ChevronDownIcon />}
          p={0}
          _hover={{ bg: "transparent" }}
        >
          {/* <Avatar size="sm" name="John Doe" src={logo} /> */}
        </MenuButton>
        <MenuList>
        <MenuItem
          icon={<FaSignOutAlt />}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "https://bitmarte-frontend-git-staging-devcbits-projects.vercel.app/admin/login";
          }}
        >
          Sign Out
        </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;