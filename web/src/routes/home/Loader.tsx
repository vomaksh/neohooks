import { Box, Flex, Image, Spinner, useColorModeValue } from '@chakra-ui/react';
import HookImage from '../../assets/hook.svg';

export function Loader() {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  return (
    <Flex direction="column" alignItems="center" flex={1} backgroundColor={bgColor}>
      <Box flex={1} />
      <Flex direction="column" flex={2} alignItems="center" justifyContent="center">
        <Image src={HookImage} alt="hook" height={150} />
        <Box height={8} />
        <Spinner data-testid="home-loader" thickness="4px" size="xl" color="green.400" />
      </Flex>
      <Box flex={1} />
    </Flex>
  );
}
