import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Progress,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoIosSunny } from 'react-icons/io';
import { BsMoonStarsFill, BsPlusLg } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CustomSelect, Option } from '../../common/Select';
import HookImage from '../../assets/hook.svg';
import GithubDarkImage from '../../assets/github-dark.png';
import GithubLightImage from '../../assets/github-light.png';
import { useCreateWebhookMutation, useGetWebhooksQuery } from '../../services/webhook';
import { getFriendlyWebhookId } from '../../utils';

export function Header() {
  //  Queries
  const { data: webhooks } = useGetWebhooksQuery();

  // Mutations
  const [createWebhook] = useCreateWebhookMutation();

  // navigate hook
  const navigate = useNavigate();

  // Chakra UI hooks for styling purposes
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const plusButtonBgColor = useColorModeValue('gray.50', 'gray.700');
  const plusButtonTextColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <>
      <Box w="full" height={16} px="4" py="3" backgroundColor={bgColor}>
        <Flex flexDirection="row">
          <Flex flex="none" alignItems="center">
            <Heading size="lg" fontWeight="bold">
              Neo
            </Heading>
            <Image src={HookImage} alt="hook" ml={-1} mt={-1} height="42px" />
          </Flex>
          <Center flex="1">
            {webhooks && (
              <>
                <CustomSelect
                  placeholder="Select Webhook"
                  options={webhooks.map((w) => ({
                    label: getFriendlyWebhookId(w),
                    value: w,
                  }))}
                  onChange={(newValue) => {
                    navigate(`/w/${(newValue as Option).value}?page=1`);
                  }}
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
                        new Promise((resolve, reject) => {
                          createWebhook().then(resolve).catch(reject);
                        }),
                        {
                          loading: 'Creating webhook',
                          success: 'Webhook created successfully 🔥',
                          error: 'Failed to created webhook 😥',
                        }
                      );
                    }}
                  >
                    <BsPlusLg />
                  </Button>
                </Tooltip>
              </>
            )}
          </Center>
          <HStack spacing={2}>
            <Tooltip label="View source code">
              <Button
                p={2}
                bgColor="transparent"
                rounded="full"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://github.com/iyorozuya/neohooks', '_blank');
                }}
              >
                {colorMode === 'dark' ? (
                  <img src={GithubLightImage} alt="GitHub" height="28" width="28" />
                ) : (
                  <img src={GithubDarkImage} alt="GitHub" height="28" width="28" />
                )}
              </Button>
            </Tooltip>
            <Tooltip label="Change mode">
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
            </Tooltip>
          </HStack>
        </Flex>
      </Box>
      <Progress colorScheme="gray" height="0.5" size="xs" isIndeterminate={false} value={100} />
    </>
  );
}
