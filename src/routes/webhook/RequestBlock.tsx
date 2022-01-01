import { Box, Flex, HStack, Skeleton, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { HiOutlineClock } from 'react-icons/hi';
import { Dispatch } from 'react';
import { WebhookRequestList } from '../../types';
import { webhookRequest } from '../../utils';

interface RequestBlockProps {
  request: WebhookRequestList;
  requestsState: WebhookRequestList[];
  setRequests: Dispatch<any>;
  isLoading: boolean;
}

export function RequestBlock(props: RequestBlockProps) {
  const { request, requestsState, setRequests, isLoading } = props;
  const inactiveRequestBgColor = useColorModeValue('gray.50', 'gray.600');
  const activeRequestBgColor = useColorModeValue('gray.50', 'gray.600');
  const activeRequestBorderColor = useColorModeValue('gray.500', 'gray.100');
  const inactiveRequestBorderColor = useColorModeValue('transparent', 'transparent');
  return (
    <VStack
      spacing={1}
      bgColor={request.isActive && !isLoading ? activeRequestBgColor : inactiveRequestBgColor}
      width="full"
      borderRadius="base"
      py={1.5}
      px={2}
      borderWidth={!isLoading && request.isActive ? 2 : 2}
      borderColor={
        request.isActive && !isLoading ? activeRequestBorderColor : inactiveRequestBorderColor
      }
      onClick={(event) => {
        event.preventDefault();
        if (!request.isActive) {
          setRequests(
            requestsState.map((r) => {
              if (r.id === request.id) {
                return {
                  ...r,
                  isActive: true,
                };
              }
              return {
                ...r,
                isActive: false,
              };
            })
          );
        }
      }}
      cursor="pointer"
      shadow="base"
    >
      <HStack spacing={1} width="full">
        <Skeleton height="20px" isLoaded={!isLoading}>
          <Box
            bgColor={webhookRequest.getColorByRequestMethod(request.method)}
            textColor="white"
            rounded="base"
            shadow="sm"
            px={2}
            py={0.5}
          >
            <Text fontSize="sm">{request.method}</Text>
          </Box>
        </Skeleton>
        <Box>
          <Skeleton height="20px" isLoaded={!isLoading}>
            <Text size="sm">#{request.id}</Text>
          </Skeleton>
        </Box>
      </HStack>
      <Flex fontSize="sm" width="full">
        <Box flex={1} />
        <Skeleton height="20px" isLoaded={!isLoading}>
          <Box flex="none">
            <HStack spacing={1}>
              <HiOutlineClock />
              <Text>{request.time}</Text>
            </HStack>
          </Box>
        </Skeleton>
      </Flex>
    </VStack>
  );
}
