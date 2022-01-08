import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spinner,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  useClipboard,
  useColorMode,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { GoChevronRight, GoClippy, GoHome } from 'react-icons/go';
import { HiOutlineClock } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { useFindRequestQuery } from '../../services/webhook';
import { RequestInfoTab, WebhookRequest } from '../../types';
import {
  createRequestTabData,
  getColorByRequestMethod,
  getFriendlyWebhookId,
  getFriendlyWebhookRequestId,
  getRequestInfoTabs,
} from '../../utils';

interface RequestInfoProps {
  isLoading: boolean;
  selectedRequestId: string;
}

export function RequestInfo(props: RequestInfoProps) {
  const { isLoading, selectedRequestId } = props;

  // RTK find webhook request
  const {
    isLoading: isFindRequestLoading,
    isFetching: isFindRequestFetching,
    data: findRequestData,
  } = useFindRequestQuery(selectedRequestId, { skip: selectedRequestId === '' });

  // Get webhook id via router param
  const params = useParams();

  if (isLoading || isFindRequestLoading || isFindRequestFetching) {
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
        <BreadcrumbNavigation webhookId={params.webhookId} />
        {findRequestData && <RequestHeader request={findRequestData} />}
        {findRequestData && <RequestInfoTabs request={findRequestData} />}
      </VStack>
    </Box>
  );
}

function BreadcrumbNavigation(props: { webhookId: string | undefined }) {
  const { webhookId } = props;
  return (
    <HStack width="full">
      <GoHome />
      <GoChevronRight />
      <Heading fontSize="sm" fontWeight="semibold">
        {getFriendlyWebhookId(webhookId as string)}
      </Heading>
    </HStack>
  );
}

function RequestHeader(props: { request: WebhookRequest }) {
  const { request } = props;
  const { onCopy } = useClipboard(request.id);
  const clipboardTextColor = useColorModeValue('gray.600', 'gray.100');
  const { colorMode } = useColorMode();
  return (
    <Flex width="full" alignItems="center">
      <Tag
        variant={colorMode === 'light' ? 'solid' : 'subtle'}
        colorScheme={getColorByRequestMethod(request.method)}
        shadow="base"
      >
        {request.method}
      </Tag>
      <Flex flex={1} ml={2}>
        <Heading>{getFriendlyWebhookRequestId(request.id)}</Heading>
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
        <Text>{dayjs(request.createdAt).fromNow(true)} ago</Text>
      </HStack>
    </Flex>
  );
}

function RequestInfoTabs(props: { request: WebhookRequest }) {
  const { request } = props;
  const bgColor = useColorModeValue('transparent', 'gray.700');
  const detailsTabData = createRequestTabData(RequestInfoTab.DETAILS, request);
  const headersTabData = createRequestTabData(RequestInfoTab.HEADERS, request);
  const queryStringData = createRequestTabData(RequestInfoTab.QUERY_STRINGS, request);
  const bodyData = createRequestTabData(RequestInfoTab.BODY, request);
  return (
    <Box width="full" shadow="lg" rounded="base" bgColor={bgColor}>
      <Tabs>
        <TabList>
          {getRequestInfoTabs(request.method).map((tab) => (
            <Tab key={tab} textTransform="capitalize">
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <RequestInfoTabPanel data={detailsTabData} />
          </TabPanel>
          <TabPanel p={0}>
            <RequestInfoTabPanel data={headersTabData} />
          </TabPanel>
          <TabPanel p={0}>
            <RequestInfoTabPanel data={queryStringData} />
          </TabPanel>
          <TabPanel p={0}>
            <RequestInfoTabPanel data={bodyData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function RequestInfoTabPanel(props: { data: Record<string, string> }) {
  const tableBorderColor = useColorModeValue('gray.200', 'gray.650');
  const attributeValueBgColor = useColorModeValue('gray.100', 'gray.600');
  const { data } = props;
  return (
    <Table size="sm">
      <Tbody>
        {Object.keys(data).map((k, i) => (
          <Tr
            key={k}
            borderBottomWidth={i === Object.keys(data).length - 1 ? 0 : 2}
            borderBottomColor={tableBorderColor}
          >
            <Td>
              <Text>{k}</Text>
            </Td>
            <Td>
              <Text
                fontFamily="mono"
                bgColor={attributeValueBgColor}
                px={2}
                py={1}
                rounded="base"
                as="span"
              >
                {data[k]}
              </Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
