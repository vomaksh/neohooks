import {Container, Flex} from "@chakra-ui/react";
import {Loader} from "./Loader";

export const Home = () => {
  return (
    <Container maxWidth={"container.xl"} padding={0} height={"100vh"}>
      <Flex direction={"column"} height={"full"} width={"full"}>
        <Loader />
      </Flex>
    </Container>
  )
}
