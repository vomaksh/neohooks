import { Box, Flex, HStack, Skeleton, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { HiOutlineClock } from 'react-icons/hi';
import { WebhookRequestCoreInfo } from '../../types';
import { webhookRequest } from '../../utils';

interface RequestBlockProps {
  request: WebhookRequestCoreInfo;
  isLoading: boolean;
}

export function RequestBlock(props: RequestBlockProps) {
  const { request, isLoading } = props;
  const inactiveRequestBgColor = useColorModeValue('white', 'gray.600');
  const activeRequestBgColor = useColorModeValue('gray.50', 'gray.600');
  const activeRequestBorderColor = useColorModeValue('gray.500', 'gray.100');
  const inactiveRequestBorderColor = useColorModeValue('transparent', 'transparent');
  return (
    <VStack
      spacing={1}
      /* bgColor={request.isActive && !isLoading ? activeRequestBgColor : inactiveRequestBgColor} */
      bgColor={!isLoading ? activeRequestBgColor : inactiveRequestBgColor}
      width="full"
      borderRadius="base"
      py={1.5}
      px={2}
      borderWidth={2}
      borderColor={
        /* request.isActive && !isLoading ? activeRequestBorderColor : inactiveRequestBorderColor */
        !isLoading ? activeRequestBorderColor : inactiveRequestBorderColor
      }
      onClick={(event) => {
        event.preventDefault();
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
            <Text size="sm">#{request.id.slice(0, 10)}</Text>
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
