import { Box, Button, Flex, Spinner, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { webhookRequestActions } from '../../features/webhookRequest';
import { RootState } from '../../store';
import { WebhookRequestCoreInfo } from '../../types';
import { RequestBlock } from './RequestBlock';

interface RequestListProps {
  isFetching: boolean;
  requests: WebhookRequestCoreInfo[] | undefined;
}

export function RequestList(props: RequestListProps) {
  const { isFetching, requests } = props;

  // Redux hooks
  const currentRequest = useSelector((state: RootState) => state.webhookRequest);
  const dispatch = useDispatch();

  // style hooks
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  // change selected request by click
  const requestBlockClickHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    return (requestId: string) => {
      dispatch(webhookRequestActions.set(requestId));
    };
  };

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
          <Text fontSize="md">Waiting for first request</Text>
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
          <RequestBlock
            key={request.id}
            isLoading={isFetching}
            currentRequest={currentRequest}
            request={request}
            onClick={requestBlockClickHandler}
          />
        ))}
      </VStack>
    </Flex>
  );
}
