import { Box, Heading, Text } from '@chakra-ui/react';

function MarketData() {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Market Data
      </Heading>
      <Box borderWidth={1} p={4} mb={4} borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="md" mb={2}>
          Nifty 50
        </Heading>
        <Text fontSize="xl" fontWeight="bold">
          14,500.45
        </Text>
        <Text fontSize="md" color="gray.500">
          +123.45 (+0.85%)
        </Text>
      </Box>
      <Box borderWidth={1} p={4} mb={4} borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="md" mb={2}>
          Sensex
        </Heading>
        <Text fontSize="xl" fontWeight="bold">
          48,500.75
        </Text>
        <Text fontSize="md" color="gray.500">
          +345.67 (+0.71%)
        </Text>
      </Box>
      <Box borderWidth={1} p={4} mb={4} borderRadius="lg" boxShadow="md">
        <Heading as="h2" size="md" mb={2}>
          Bank Nifty
        </Heading>
        <Text fontSize="xl" fontWeight="bold">
          32,500.25
        </Text>
        <Text fontSize="md" color="gray.500">
          -56.78 (-0.17%)
        </Text>
      </Box>
    </Box>
  );
}

export default MarketData;
