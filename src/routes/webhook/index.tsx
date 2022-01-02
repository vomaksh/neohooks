import { Container, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { RequestList } from './RequestList';
import { RequestInfo } from './RequestInfo';
import { WebhookInfo } from './WebhookInfo';

export function Webhook() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <Container maxWidth="container.xl" padding={0} height="100vh">
      <Flex direction="column" height="full" width="full">
        <Header />
        <Flex flex={1}>
          <RequestList />
          {loading ? <WebhookInfo /> : <RequestInfo />}
        </Flex>
      </Flex>
    </Container>
  );
}
