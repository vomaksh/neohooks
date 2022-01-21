import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from './Header';
import { RequestList } from './RequestList';
import { useFindWebhookQuery } from '../../services/webhook';
import { InfoContainer } from './InfoContainer';
import { webhookRequestActions } from '../../features/webhookRequest';
import { RootState } from '../../store';

export function Webhook() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  // Get selected webhook request
  const webhookRequestId = useSelector((state: RootState) => state.webhookRequest);

  // Fetch webhook by id
  const { isLoading, isFetching, data } = useFindWebhookQuery(
    {
      webhookId: params.webhookId as string,
    },
    {
      refetchOnMountOrArgChange: true,
      skip: !params.webhookId,
    }
  );

  // Set webhook request id if got from params
  useEffect(() => {
    if (params.webhookId && params.requestId) {
      if (params.requestId !== webhookRequestId) {
        dispatch(webhookRequestActions.set(params.requestId));
      }
    }
  }, [params.requestId]);

  /*
    If webhook id and webhook request exists
    then check if requestId is present in the url
    If requestId already exists then navigate but don't replace because back navigation will mess up
    else meaning if requestId doesn't exist i.e. you only have webhookId in the route then navigate and replace
  */
  useEffect(() => {
    if (params.webhookId && webhookRequestId) {
      if (!params.requestId) {
        navigate(`/w/${params.webhookId}/${webhookRequestId}`, {
          replace: true,
        });
      } else if (params.requestId !== webhookRequestId) {
        if (params.requestId && webhookRequestId) {
          navigate(`/w/${params.webhookId}/${webhookRequestId}`);
        }
      }
    }
  }, [webhookRequestId]);

  return (
    <Container maxWidth="full" padding={0} height="100vh">
      <Flex direction="column" height="full" width="full">
        <Header currentWebhookId={params.webhookId} />
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
