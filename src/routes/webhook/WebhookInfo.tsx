import { Box, Button, Flex, Heading, HStack, Text, useClipboard, VStack } from '@chakra-ui/react';
import { GoClippy } from 'react-icons/go';
import { toast } from 'react-hot-toast';

export function WebhookInfo() {
  const webhookURL = 'https://webhook.site/b9d10e34-b83a-4b2d-9ae0-154d31669fca';
  const { onCopy } = useClipboard(webhookURL);
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
          <HStack
            display="flex"
            alignItems="center"
            bgColor="gray.100"
            rounded="base"
            px={4}
            py={1.5}
          >
            <Text fontSize="base">
              <pre>{webhookURL}</pre>
            </Text>
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
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  );
}
