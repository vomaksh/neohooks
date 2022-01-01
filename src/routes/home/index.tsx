import { Container, Flex } from '@chakra-ui/react';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateWebhookMutation } from '../../services/webhook';
import { Loader } from './Loader';

/*
  Route Path: /
*/
export function Home() {
  const navigate = useNavigate();
  const [createWebhook, createWebhookResult] = useCreateWebhookMutation();

  // Trigger create webhook on component mount
  useEffect(() => {
    createWebhook();
  }, []);

  // If mutation status is fullfilled then navigate user to created webhook
  useEffect(() => {
    if (createWebhookResult.status === QueryStatus.fulfilled) {
      navigate(`/${createWebhookResult.data.id}`);
    }
  }, [createWebhookResult.status]);

  return (
    <Container maxWidth="container.xl" padding={0} height="100vh">
      <Flex direction="column" height="full" width="full">
        <Loader />
      </Flex>
    </Container>
  );
}
