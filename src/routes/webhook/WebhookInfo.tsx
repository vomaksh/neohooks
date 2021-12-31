import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import { GoClippy } from 'react-icons/go';
import { MdOpenInNew } from 'react-icons/md';

export function WebhookInfo() {
  const webhookURL = 'https://webhook.site/b9d10e34-b83a-4b2d-9ae0-154d31669fca';
  const { onCopy } = useClipboard(webhookURL);
  const webhookURLBgColor = useColorModeValue('gray.100', 'gray.700');
  return (
    <Flex flex={1} bgColor="whiteAlpha.30" padding={4} height="full">
      <VStack spacing={4}>
        <VStack spacing={2} width="full">
          <Heading width="full">Welcome to neohook.app 👋</Heading>
          <VStack spacing={1} width="full">
            <Text fontSize="lg" width="full">
              It lets you easily inspect incoming HTTP request.
            </Text>
            <Text fontSize="lg" width="full">
              Any request sent to given webhook URL will be shown here.
            </Text>
          </VStack>
        </VStack>
        <VStack spacing={2}>
          <Box width="full">
            <Heading fontSize="2xl">Webhook URL</Heading>
          </Box>
          <HStack display="flex" alignItems="center" spacing={2}>
            <Text fontSize="base" bgColor={webhookURLBgColor} py={1} px={3} rounded="base">
              <pre>{webhookURL}</pre>
            </Text>
            <HStack spacing={2}>
              <Tooltip label="Copy to clipboard">
                <Button
                  size="sm"
                  fontSize="base"
                  onClick={(e) => {
                    e.preventDefault();
                    onCopy();
                    toast.success('Copied URL 👍', {
                      position: 'bottom-center',
                    });
                  }}
                >
                  <GoClippy />
                </Button>
              </Tooltip>
              <Tooltip label="Open in new tab">
                <Button
                  size="sm"
                  fontSize="base"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <MdOpenInNew />
                </Button>
              </Tooltip>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
}
