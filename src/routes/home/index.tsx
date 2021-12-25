import {Header} from "./Header";
import {Container, Flex} from "@chakra-ui/react";

export const Home = () => {
  return (
    <Container maxWidth={"container.xl"} padding={0} height={"100vh"}>
      <Flex direction={"column"} height={"full"} width={"full"}>
        <Header />
      </Flex>
    </Container>
  )
}
