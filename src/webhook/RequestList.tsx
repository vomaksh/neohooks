import {Box, Button, Flex, HStack, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import {requests} from "../data/data";
import {useState} from "react";
import {HiOutlineClock} from "react-icons/hi";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {webhookRequest} from "../utils";

export const RequestList = () => {
  const [requestsState, setRequests] = useState<typeof requests>(requests);
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const inactiveRequestBgColor = useColorModeValue("gray.300", "gray.600");
  const activeRequestBgColor = useColorModeValue("blue.200", "blue.600");
  return (
    <Flex direction={"column"} width={80} bgColor={bgColor} px={4} height={"full"}>
      <VStack flex={1} spacing={4} width={"full"} py={4}>
        {requestsState.map(request => (
          <VStack
            key={request.id}
            spacing={1}
            bgColor={request.isActive ? activeRequestBgColor : inactiveRequestBgColor}
            width={"full"}
            borderRadius={"base"}
            py={1.5}
            px={2}
            onClick={event => {
              event.preventDefault()
              if (!request.isActive) {
                setRequests(requestsState.map(r => {
                  if (r.id === request.id) r.isActive = true
                  else r.isActive = false
                  return r
                }))
              }
            }}
            cursor={"pointer"}
          >
            <HStack spacing={2} width={"full"}>
              <Box
                bgColor={webhookRequest.getColorByRequestMethod(request.method)}
                textColor={"white"}
                rounded={"base"}
                shadow={"sm"}
                px={2}
                py={0.5}
              >
                <Text fontSize={"sm"}>{request.method}</Text>
              </Box>
              <Box>
                <Text fontSize={16} fontWeight={"bold"}>#{request.id}</Text>
              </Box>
            </HStack>
            <Flex fontSize={"sm"} width={"full"}>
              <Box flex={1} />
              <HStack spacing={1}>
                <HiOutlineClock />
                <Text>{request.time}</Text>
              </HStack>
            </Flex>
          </VStack>
        ))}
      </VStack>
      <Flex py={2}>
        <Flex alignItems={"center"}>
          <Button>
          <Text><FaChevronLeft /></Text>
          </Button>
        </Flex>
        <Box flex={1}>

        </Box>
          <Flex alignItems={"center"}>
            <Button>
          <Text><FaChevronRight /></Text>
            </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
