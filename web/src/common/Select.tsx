import {
  Box,
  Button,
  List,
  ListItem,
  SlideFade,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useSelect } from 'downshift';
import Scrollbars from 'react-custom-scrollbars-2';
import { BiChevronDown } from 'react-icons/bi';

export type Option = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  options: Option[];
  placeholder: string;
  value: Option;
  onChange: (value: string) => void;
}

export function CustomSelect(props: CustomSelectProps) {
  const { options, value, placeholder, onChange } = props;
  const {
    isOpen,
    closeMenu,
    selectedItem,
    selectItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: options.map((option) => option.value),
    defaultSelectedItem: value.value,
  });
  const { colorMode } = useColorMode();
  const dropdownButtonBorderColor = useColorModeValue('gray.500', 'transparent');
  const dropdownButtonBgColor = useColorModeValue('gray.50', 'gray.700');
  const dropdownBgColor = useColorModeValue('white', 'gray.700');
  const selectedItemBackgroundColor = useColorModeValue('blue.100', 'blue.500');
  return (
    <Box position="relative" width="210px" zIndex={300}>
      <Button
        {...getToggleButtonProps()}
        variant="outline"
        colorScheme="gray"
        borderWidth={2}
        backgroundColor={dropdownButtonBgColor}
        borderColor={dropdownButtonBorderColor}
        fontWeight="normal"
        px={2}
        width="full"
        rightIcon={<BiChevronDown fontSize="20" />}
      >
        {!selectedItem ? placeholder : value.label}
      </Button>

      <SlideFade in={isOpen}>
        <List
          {...getMenuProps()}
          mt={2}
          position="absolute"
          shadow="2xl"
          width="full"
          rounded="md"
          backgroundColor={dropdownBgColor}
          overflowY="auto"
        >
          <Scrollbars autoHeight autoHeightMax="150px">
            {isOpen &&
              options.map((option, index) => (
                <ListItem
                  {...getItemProps({ item: option.value, index })}
                  key={option.value}
                  px={2}
                  py={1.5}
                  cursor="pointer"
                  onClick={() => {
                    selectItem(option.value);
                    closeMenu();
                    onChange(option.value);
                  }}
                  backgroundColor={
                    selectedItem === option.value ? selectedItemBackgroundColor : dropdownBgColor
                  }
                  userSelect="none"
                  _hover={{
                    backgroundColor: colorMode === 'light' ? 'gray.200' : 'gray.600',
                    transition: 'background 300ms',
                  }}
                >
                  {option.label}
                </ListItem>
              ))}
          </Scrollbars>
        </List>
      </SlideFade>
    </Box>
  );
}
