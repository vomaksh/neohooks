import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useClipboard,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { GoChevronRight, GoClippy, GoHome } from 'react-icons/go';
import { HiOutlineClock } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { currentRequest, requestInfoTabs, webhooks } from '../../data/data';
import { webhookRequest } from '../../utils';

export function RequestInfo() {
  const loading = false;
  if (loading) {
    return (
      <Flex
        flex={1}
        bgColor="whiteAlpha.30"
        padding={4}
        height="full"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }
  return (
    <Box flex={1} bgColor="whiteAlpha.30" padding={4} height="full">
      <VStack width="full" spacing={3}>
        <BreadcrumbNavigation />
        <RequestHeader request={currentRequest} />
        <RequestInfoTabs request={currentRequest} />
      </VStack>
    </Box>
  );
}

function BreadcrumbNavigation() {
  return (
    <HStack width="full">
      <GoHome />
      <GoChevronRight />
      <Heading fontSize="sm" fontWeight="semibold">
        {webhooks[0].id}
      </Heading>
    </HStack>
  );
}

function RequestHeader(props: { request: typeof currentRequest }) {
  const { request } = props;
  const { onCopy } = useClipboard(request.requestId);
  const clipboardTextColor = useColorModeValue('gray.600', 'gray.100');
  return (
    <Flex width="full" alignItems="center">
      <Box
        bgColor={webhookRequest.getColorByRequestMethod(request.method)}
        textColor="white"
        rounded="base"
        shadow="base"
        px={2}
        py={0.5}
      >
        <Text fontSize="sm" fontWeight="medium">
          {request.method}
        </Text>
      </Box>
      <Flex flex={1} ml={2}>
        <Heading>{request.requestId}</Heading>
        <Button
          p={0}
          ml={2}
          color={clipboardTextColor}
          onClick={(e) => {
            e.preventDefault();
            onCopy();
            toast.success('Copied 👍', {
              position: 'bottom-center',
            });
          }}
        >
          <GoClippy />
        </Button>
      </Flex>
      <HStack spacing={1}>
        <HiOutlineClock />
        <Text>{request.time}</Text>
      </HStack>
    </Flex>
  );
}

function RequestInfoTabs(props: { request: typeof currentRequest }) {
  const { request } = props;
  const bgColor = useColorModeValue('transparent', 'gray.700');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.650');
  return (
    <Box width="full" shadow="lg" rounded="base" bgColor={bgColor}>
      <Tabs>
        <TabList>
          {requestInfoTabs.map((t) => (
            <Tab key={t.name}>{t.name}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            {request.tab.details.map((d, i) => (
              <Flex
                key={d.name}
                borderBottomWidth={i === request.tab.details.length - 1 ? 0 : 2}
                px={4}
                py={2}
                borderBottomColor={tableBorderColor}
              >
                <Box flex={1}>
                  <Text>{d.name}</Text>
                </Box>
                <Box flex={1}>
                  <Text>{d.value}</Text>
                </Box>
              </Flex>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
