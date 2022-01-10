import { Container, Flex } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Header } from './Header';
import { RequestList } from './RequestList';
import { useFindWebhookQuery } from '../../services/webhook';
import { InfoContainer } from './InfoContainer';

export function Webhook() {
  const params = useParams();
  const [searchParams] = useSearchParams({
    page: '1',
  });
  const { isLoading, isFetching, data } = useFindWebhookQuery({
    webhookId: params.webhookId as string,
    page: searchParams.get('page') as string,
  });

  return (
    <Container maxWidth="container.xl" padding={0} height="100vh">
      <Flex direction="column" height="full" width="full">
        <Header />
        <Flex flex={1}>
          <RequestList
            isFetching={isFetching}
            requests={data?.requests}
            pageMetadata={{
              page: data?.page as number,
              rows: data?.rows as number,
              total: data?.total as number,
            }}
          />
          <InfoContainer isLoading={isLoading} isFetching={isFetching} requests={data?.requests} />
        </Flex>
      </Flex>
    </Container>
  );
}
