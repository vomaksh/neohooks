import {Box, Button, Flex, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {requests} from "../../data/data";
import {useState} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {RequestBlock} from "./RequestBlock";

export const RequestList = () => {
  const [requestsState, setRequests] = useState<typeof requests>(requests);
  const bgColor = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex direction={"column"} width={80} bgColor={bgColor} px={4} height={"full"}>
      <VStack flex={1} spacing={4} width={"full"} py={4}>
        {requestsState.map(request => (
          <RequestBlock
            key={request.id}
            isLoading={true}
            request={request}
            requestsState={requestsState}
            setRequests={setRequests}
          />
        ))}
      </VStack>
      <Flex py={2}>
        <Flex alignItems={"center"}>
          <Button>
          <Text><FaChevronLeft /></Text>
          </Button>
        </Flex>
        <Box flex={1}></Box>
        <Flex alignItems={"center"}>
        <Button>
          <Text><FaChevronRight /></Text>
        </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
