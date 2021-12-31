import { Box, Button, Flex, Spinner, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { requests } from '../../data/data';
import { RequestBlock } from './RequestBlock';

export function RequestList() {
  const [requestsState, setRequests] = useState<typeof requests>([]);
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    setTimeout(() => {
      setRequests(requests);
    }, 5000);
  }, []);

  if (requestsState.length === 0) {
    return (
      <Flex
        width={80}
        bgColor={bgColor}
        px={4}
        alignItems="center"
        justifyContent="center"
        height="full"
      >
        <VStack flex="1" py={4}>
          <Spinner size="lg" />
          <Text fontSize="lg">Waiting for first request</Text>
        </VStack>
      </Flex>
    );
  }
  return (
    <Flex direction="column" width={80} bgColor={bgColor} px={4} height="full">
      <VStack flex={1} spacing={4} width="full" py={4}>
        {requestsState.map((request) => (
          <RequestBlock
            key={request.id}
            isLoading={false}
            request={request}
            requestsState={requestsState}
            setRequests={setRequests}
          />
        ))}
      </VStack>
      <Flex py={2}>
        <Flex alignItems="center">
          <Button>
            <Text>
              <FaChevronLeft />
            </Text>
          </Button>
        </Flex>
        <Box flex={1} />
        <Flex alignItems="center">
          <Button>
            <Text>
              <FaChevronRight />
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
