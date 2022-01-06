import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { WebhookRequestCoreInfo } from '../../types';
import { RequestInfo } from './RequestInfo';
import { WebhookInfo } from './WebhookInfo';

interface InfoContainerProps {
  isLoading: boolean;
  isFetching: boolean;
  requests: WebhookRequestCoreInfo[] | undefined;
}

export function InfoContainer(props: InfoContainerProps) {
  const { isLoading, isFetching, requests } = props;

  // Redux selector hooks
  const selectedRequestId: string = useSelector((state: RootState) => state.webhookRequest);

  if (isLoading) {
    return <RequestInfo isLoading={isLoading} selectedRequestId={selectedRequestId} />;
  }
  if (!isLoading && isFetching) {
    return <RequestInfo isLoading={isFetching} selectedRequestId={selectedRequestId} />;
  }
  if (!requests || (requests && requests.length === 0)) {
    return <WebhookInfo />;
  }
  if (requests && requests.length > 0) {
    return <RequestInfo isLoading={false} selectedRequestId={selectedRequestId} />;
  }
  return <div />;
}
