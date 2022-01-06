import { Box, Flex, HStack, Skeleton, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { MouseEvent } from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import { WebhookRequestCoreInfo } from '../../types';
import { getColorByRequestMethod, getFriendlyWebhookRequestId } from '../../utils';

interface RequestBlockProps {
  request: WebhookRequestCoreInfo;
  isLoading: boolean;
  currentRequest: number | string;
  onClick: (event: MouseEvent<HTMLElement>) => (id: string) => void;
}

export function RequestBlock(props: RequestBlockProps) {
  const { request, currentRequest, isLoading, onClick } = props;
  const inactiveRequestBgColor = useColorModeValue('white', 'gray.600');
  const activeRequestBgColor = useColorModeValue('white', 'gray.600');
  const activeRequestBorderColor = useColorModeValue('gray.500', 'gray.100');
  const inactiveRequestBorderColor = useColorModeValue('transparent', 'transparent');
  const isRequestActive = request.id === currentRequest;
  return (
    <VStack
      spacing={1}
      bgColor={isRequestActive && !isLoading ? activeRequestBgColor : inactiveRequestBgColor}
      width="full"
      borderRadius="base"
      py={1.5}
      px={2}
      borderWidth={2}
      borderColor={
        isRequestActive && !isLoading ? activeRequestBorderColor : inactiveRequestBorderColor
      }
      onClick={(e) => onClick(e)(request.id)}
      cursor="pointer"
      shadow="base"
    >
      <HStack spacing={1} width="full">
        <Skeleton height="20px" isLoaded={!isLoading}>
          <Box
            bgColor={getColorByRequestMethod(request.method)}
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
            <Text size="sm">{getFriendlyWebhookRequestId(request.id)}</Text>
          </Skeleton>
        </Box>
      </HStack>
      <Flex fontSize="sm" width="full">
        <Box flex={1} />
        <Skeleton height="20px" isLoaded={!isLoading}>
          <Box flex="none">
            <HStack spacing={1}>
              <HiOutlineClock />
              <Text>{dayjs(request.createdAt).fromNow(true)} ago</Text>
            </HStack>
          </Box>
        </Skeleton>
      </Flex>
    </VStack>
  );
}
