import { Box, Button, Flex, Spinner, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { MouseEvent } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { webhookRequestActions } from '../../features/webhookRequest';
import { RootState } from '../../store';
import { Pagination, WebhookRequestCoreInfo } from '../../types';
import { RequestBlock } from './RequestBlock';

interface RequestListProps {
  isFetching: boolean;
  requests: WebhookRequestCoreInfo[] | undefined;
  pageMetadata: Pagination;
}

enum NextPrevButton {
  PREVIOUS = 'previous',
  NEXT = 'next',
}

export function RequestList(props: RequestListProps) {
  const { isFetching, requests, pageMetadata } = props;

  const [searchParam, setSearchParam] = useSearchParams();

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

  // prev and next button handler
  const prevNextButtonHandler = (nextPrevButton: NextPrevButton) => {
    const pageNumber = parseInt(searchParam.get('page') as string, 10);
    if (nextPrevButton === NextPrevButton.PREVIOUS) {
      if (pageNumber > 1) {
        setSearchParam({
          page: `${pageNumber - 1}`,
        });
      }
    } else if (nextPrevButton === NextPrevButton.NEXT) {
      if (pageNumber <= Math.floor(pageMetadata.total / pageMetadata.rows)) {
        setSearchParam({
          page: `${pageNumber + 1}`,
        });
      }
    }
  };

  if (!requests || (requests.length === 0 && pageMetadata.page === 0)) {
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
    <Flex direction="column" width={80} bgColor={bgColor}>
      <Flex py={2} alignItems="center">
        <Flex alignItems="center">
          <Button
            size="sm"
            disabled={pageMetadata.page === 0}
            onClick={() => prevNextButtonHandler(NextPrevButton.PREVIOUS)}
          >
            <Text>
              <FaChevronLeft />
            </Text>
          </Button>
        </Flex>
        <Flex flex={1} justifyContent="center">
          <Text fontSize="sm">Page {pageMetadata.page + 1}</Text>
          <Text fontSize="sm" ml={1}>
            ({pageMetadata.total} requests)
          </Text>
        </Flex>
        <Flex alignItems="center">
          <Button
            size="sm"
            disabled={pageMetadata.page === Math.floor(pageMetadata.total / pageMetadata.rows)}
            onClick={() => prevNextButtonHandler(NextPrevButton.NEXT)}
          >
            <Text>
              <FaChevronRight />
            </Text>
          </Button>
        </Flex>
      </Flex>
      <Scrollbars style={{ height: 'calc(100vh - 7.2em)', width: '20rem' }}>
        <VStack px={3} flex={1} spacing={2} width="full" pb={3}>
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
      </Scrollbars>
    </Flex>
  );
}
