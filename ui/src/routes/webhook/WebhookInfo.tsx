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
import { useParams } from 'react-router-dom';

export function WebhookInfo() {
  const { webhookId } = useParams();
  const webhookURL = `${window.location.origin}/${webhookId as string}`;
  const { onCopy } = useClipboard(webhookURL);
  const webhookURLBgColor = useColorModeValue('gray.100', 'gray.700');
  return (
    <Flex
      flex={1}
      bgColor="whiteAlpha.30"
      height="full"
      width="full"
      padding={4}
      justifyContent="center"
    >
      <VStack flex="none" spacing={4} maxWidth="container.xl" width="full">
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
        <VStack spacing={2} width="full">
          <Box width="full">
            <Heading fontSize="2xl">Webhook URL</Heading>
          </Box>
          <HStack display="flex" alignItems="center" spacing={2} width="full">
            <Text
              fontSize="md"
              bgColor={webhookURLBgColor}
              py={1}
              px={3}
              rounded="base"
              fontFamily="monospace"
            >
              {webhookURL}
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
                    window.open(webhookURL, '_blank');
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
