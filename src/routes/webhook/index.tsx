import { Container, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Header } from './Header';
import { RequestList } from './RequestList';
import { useFindWebhookQuery } from '../../services/webhook';
import { InfoContainer } from './InfoContainer';

export function Webhook() {
  const params = useParams();
  const { isLoading, isFetching, data } = useFindWebhookQuery({
    webhookId: params.webhookId as string,
  });

  return (
    <Container maxWidth="full" padding={0} height="100vh">
      <Flex direction="column" height="full" width="full">
        <Header />
        <Flex flex={1}>
          <RequestList
            isFetching={isFetching}
            requests={data?.requests}
            pageMetadata={{
              total: data?.total as number,
            }}
          />
          <InfoContainer isLoading={isLoading} isFetching={isFetching} requests={data?.requests} />
        </Flex>
      </Flex>
    </Container>
  );
}
