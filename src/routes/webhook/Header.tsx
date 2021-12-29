import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoIosSunny } from 'react-icons/io';
import { BsMoonStarsFill, BsPlusLg } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { webhooks } from '../../data/data';
import { CustomSelect } from '../../common/Select';
import HookImage from '../../assets/hook.svg';

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const plusButtonBgColor = useColorModeValue('gray.50', 'gray.700');
  const plusButtonTextColor = useColorModeValue('gray.700', 'gray.200');
  return (
    <Box
      w="full"
      height={16}
      borderBottomWidth={2}
      borderColor="gray.500"
      px="4"
      py="3"
      alignItems="middle"
      backgroundColor={bgColor}
    >
      <Flex flexDirection="row">
        <Flex flex="none">
          <Text fontSize="2xl">Neo</Text>
          <Image src={HookImage} alt="hook" ml={-1} mt={-1} />
        </Flex>
        <Center flex="1">
          <CustomSelect
            placeholder="Select Webhook"
            options={webhooks.map((w) => ({ label: w.value, value: w.id }))}
          />
          <Tooltip label="Create">
            <Button
              ml={2}
              borderWidth={colorMode === 'light' ? 2 : 0}
              borderColor="gray.500"
              backgroundColor={plusButtonBgColor}
              color={plusButtonTextColor}
              onClick={async (e) => {
                e.preventDefault();
                await toast.promise(
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve(10);
                    }, 2000);
                  }),
                  {
                    loading: 'Creating webhook',
                    success: 'Webhook created successfully 🔥',
                    error: 'Failed to created webhook :(',
                  },
                  {
                    position: 'bottom-center',
                  }
                );
              }}
            >
              <BsPlusLg />
            </Button>
          </Tooltip>
        </Center>
        <HStack spacing={2}>
          <Button
            p={2}
            bgColor="transparent"
            color={colorMode === 'dark' ? 'orange.300' : 'blue.400'}
            fontSize="xl"
            rounded="full"
            onClick={(e) => {
              e.preventDefault();
              toggleColorMode();
            }}
          >
            {colorMode === 'dark' ? <IoIosSunny /> : <BsMoonStarsFill />}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
