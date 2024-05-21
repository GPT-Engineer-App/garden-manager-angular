import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header" width="100%" bg="blue.500" color="white" py={4} px={8}>
      <Text fontSize="2xl" fontWeight="bold">
        Garden Management
      </Text>
    </Box>
  );
};

export default Header;
