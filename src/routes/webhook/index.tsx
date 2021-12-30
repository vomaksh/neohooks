import { Toaster } from 'react-hot-toast';
import { Container, Flex } from '@chakra-ui/react';
import { Header } from './Header';
import { RequestList } from './RequestList';
// import { RequestInfo } from './RequestInfo';
import { WebhookInfo } from './WebhookInfo';

export function Webhook() {
  return (
    <Container maxWidth="container.xl" padding={0} height="100vh">
      <Flex direction="column" height="full" width="full">
        <Header />
        <Flex flex={1}>
          <RequestList />
          <WebhookInfo />
          {/* <RequestInfo /> */}
        </Flex>
      </Flex>
      <Toaster />
    </Container>
  );
}
