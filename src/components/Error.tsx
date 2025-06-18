import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  actionText?: string;
  actionTo?: string;
}

const ErrorMessage = ({
  title = "Something Went Wrong",
  message = "We couldn't complete your request. Please try again later.",
  actionText = "Go Home",
  actionTo = "/",
}: ErrorMessageProps) => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="xl"
        bgGradient="linear(to-r, red.400, red.600)"
        backgroundClip="text"
        mb={3}
      >
        {title}
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        {message}
      </Text>

      <Button
        as={RouterLink}
        to={actionTo}
        colorScheme="red"
        bgGradient="linear(to-r, red.400, red.500, red.600)"
        color="white"
        variant="solid"
      >
        {actionText}
      </Button>
    </Box>
  );
};

export default ErrorMessage;
