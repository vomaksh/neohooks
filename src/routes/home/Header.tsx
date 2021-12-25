import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import {IoIosSunny} from "react-icons/io";
import {BsMoonStarsFill} from "react-icons/bs";
import HookImage from "../../assets/hook.svg"

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "gray.800")
  return (
    <Box
      w={"full"}
      height={16}
      borderBottomWidth={2}
      borderColor={"gray.500"}
      px={"4"}
      py={"3"}
      alignItems={"middle"}
      backgroundColor={bgColor}
    >
      <Flex flexDirection={"row"}>
        <Flex flex={"none"}>
          <Text fontSize={"2xl"}>Neo</Text>
          <Image src={HookImage} alt={"hook"} ml={-1} mt={-1} />
        </Flex>
        <Center flex={"1"}>
        </Center>
        <HStack spacing={2}>
          <Button
            p={2}
            bgColor={"transparent"}
            color={colorMode === "light" ? "orange.300" : "blue.50"}
            fontSize={"xl"}
            rounded={"full"}
            onClick={e => {
              e.preventDefault();
              toggleColorMode();
            }}
          >
            {colorMode === "light" ? <IoIosSunny/> : <BsMoonStarsFill/>}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}


