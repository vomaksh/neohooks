import {
  Box,
  Flex,
  HStack,
  Skeleton,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
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
  const { colorMode } = useColorMode();
  const inactiveRequestBgColor = useColorModeValue('gray.50', 'gray.600');
  const activeRequestBgColor = useColorModeValue('gray.50', 'blue.500');
  const activeRequestBorderColor = useColorModeValue('gray.500', 'gray.200');
  return (
    <VStack
      spacing={1}
      bgColor={request.isActive && !isLoading ? activeRequestBgColor : inactiveRequestBgColor}
      width="full"
      borderRadius="base"
      py={1.5}
      px={2}
      borderWidth={!isLoading && request.isActive && colorMode === 'light' ? 2 : 0}
      borderColor={activeRequestBorderColor}
      onClick={(event) => {
        event.preventDefault();
        if (!request.isActive) {
          setRequests(
            requestsState.map((r) => {
              if (r.id === request.id) r.isActive = true;
              else r.isActive = false;
              return r;
            })
          );
        }
      }}
      cursor="pointer"
      shadow="md"
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
            <Text fontSize="base" fontWeight="bold">
              #{request.id}
            </Text>
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
