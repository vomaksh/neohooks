import { useEffect } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Header } from './Header';
import { RequestList } from './RequestList';
import { useFindWebhookQuery } from '../../services/webhook';
import { InfoContainer } from './InfoContainer';

export function Webhook() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, isFetching, data } = useFindWebhookQuery(
    {
      webhookId: params.webhookId as string,
      page: searchParams.get('page') as string,
    },
    {
      skip: !searchParams.get('page'),
      refetchOnMountOrArgChange: true,
    }
  );

  /* 
    Runs on mount and checks if page query parameter is valid
    If page query parameter is invalid then page is reset to 1
    else it is left untouched
  */
  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' }, { replace: true });
    } else {
      try {
        const page = parseInt(searchParams.get('page') as string, 10);
        if (Number.isNaN(page)) throw new Error('Invalid page count');
        if (page < 1) throw new Error('Invalid page count');
      } catch (error) {
        setSearchParams({ page: '1' }, { replace: true });
      }
    }
  }, []);

  return (
    <Container maxWidth="full" padding={0} height="100vh">
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
