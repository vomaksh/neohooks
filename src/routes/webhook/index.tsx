import { Container, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { RequestList } from './RequestList';
import { RequestInfo } from './RequestInfo';
import { WebhookInfo } from './WebhookInfo';
import { useFindWebhookQuery } from '../../services/webhook';

export function Webhook() {
  const params = useParams();
  const { isLoading, data } = useFindWebhookQuery(params.webhookId as string);

  return (
    <Container maxWidth="container.xl" padding={0} height="100vh">
      <Flex direction="column" height="full" width="full">
        <Header />
        <Flex flex={1}>
          <RequestList isLoading={isLoading} requests={data?.requests} />
          {isLoading ? <WebhookInfo /> : <RequestInfo />}
        </Flex>
      </Flex>
    </Container>
  );
}
