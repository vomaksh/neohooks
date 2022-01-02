import { Box, Button, Flex, Spinner, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { WebhookRequestCoreInfo } from '../../types';
import { RequestBlock } from './RequestBlock';

interface RequestListProps {
  isLoading: boolean;
  requests: WebhookRequestCoreInfo[] | undefined;
}

export function RequestList(props: RequestListProps) {
  const { isLoading, requests } = props;

  // style hooks
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  if (!requests || requests.length === 0) {
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
      <Flex py={2}>
        <Flex alignItems="center">
          <Button size="sm">
            <Text>
              <FaChevronLeft />
            </Text>
          </Button>
        </Flex>
        <Box flex={1} />
        <Flex alignItems="center">
          <Button size="sm">
            <Text>
              <FaChevronRight />
            </Text>
          </Button>
        </Flex>
      </Flex>
      <VStack flex={1} spacing={4} width="full">
        {requests.map((request) => (
          <RequestBlock key={request.id} isLoading={isLoading} request={request} />
        ))}
      </VStack>
    </Flex>
  );
}
