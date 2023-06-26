import { Box, Flex, Link } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex bg="gray.800" color="white" px={4} py={2} alignItems="center">
      <Box>
        {/* Logo or brand */}
        <Link href="/" fontSize="xl" fontWeight="bold">
          My Landing Page
        </Link>
      </Box>
      <Box ml="auto">
        {/* Navigation links */}
        <Link href="/#section1" mr={4}>
          Section 1
        </Link>
        <Link href="/#section2" mr={4}> 
          Section 2
        </Link>
        <Link href="/#section3">
          Section 3
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
