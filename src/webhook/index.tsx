import {Toaster} from "react-hot-toast";
import {Container, Flex} from "@chakra-ui/react";
import {Header} from "./Header";
import {RequestList} from "./RequestList";
import {RequestInfo} from "./RequestInfo";

export const Webhook = () => {
  return (
    <Container maxWidth={"container.xl"} padding={0} shadow={"xl"} height={"100vh"}>
      <Header />
      <Flex height={"calc(100vh - 4rem)"}>
        <RequestList />
        <RequestInfo />
      </Flex>
      <Toaster />
    </Container>
  )
}