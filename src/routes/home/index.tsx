import {Container, Flex} from "@chakra-ui/react";
import {Header} from "./Header";
import {Loader} from "./Loader";

export const Home = () => {
  return (
    <Container maxWidth={"container.xl"} padding={0} height={"100vh"}>
      <Flex direction={"column"} height={"full"} width={"full"}>
        <Header />
        <Loader />
      </Flex>
    </Container>
  )
}
