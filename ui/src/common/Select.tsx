import Select, { ActionMeta, OnChangeValue } from 'react-select';
import { useColorMode } from '@chakra-ui/react';

export type Option = {
  label: string;
  value: string;
};

interface CustomSelectProps {
  options: Option[];
  placeholder: string;
  defaultValue: Option;
  onChange: (newValue: OnChangeValue<Option, boolean>, actionMeta: ActionMeta<Option>) => void;
}

export function CustomSelect(props: CustomSelectProps) {
  const { colorMode } = useColorMode();
  const { options, placeholder, defaultValue, onChange } = props;
  const setOptionColors = optionColor(colorMode);
  return (
    <Select
      placeholder={placeholder}
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: colorMode === 'light' ? '#334155' : provided.color,
          backgroundColor: setOptionColors({
            isSelected: state.isSelected,
            lightMode: [
              '#E2E8F0',
              state.isFocused ? 'transparent' : (provided.backgroundColor as string),
            ],
            darkMode: ['#4B5563', '#374151'],
          }),
          '&:focus, &:active': {
            backgroundColor: setOptionColors({
              isSelected: state.isSelected,
              lightMode: ['#E2E8F0', '#E2E8F0'],
              darkMode: ['#6B7280', '#6B7280'],
            }),
            color: setOptionColors({
              isSelected: state.isSelected,
              lightMode: ['#334155', '#334155'],
              darkMode: [provided.color as string, provided.color as string],
            }),
          },
          '&:hover': {
            backgroundColor: setOptionColors({
              isSelected: state.isSelected,
              lightMode: ['#BFDBFE', '#BFDBFE'],
              darkMode: ['#6B7280', '#6B7280'],
            }),
            color: setOptionColors({
              isSelected: state.isSelected,
              lightMode: ['#334155', '#334155'],
              darkMode: [provided.color as string, provided.color as string],
            }),
          },
        }),
        control: (provided) => ({
          ...provided,
          backgroundColor: colorMode === 'light' ? '#F8FAFC' : '#374151',
          borderWidth: 2,
          borderColor: colorMode === 'light' ? '#64748B' : 'transparent',
          borderRadius: 4,
          boxShadow: 'none',
          '&:focus': {
            borderColor: '#1F2937',
            outline: 'none',
            boxShadow: 'none',
          },
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: colorMode === 'light' ? '#F8FAFC' : '#374151',
          padding: 0,
          margin: '0 2',
          borderRadius: 4,
        }),
        menuList: (provided) => ({
          ...provided,
          margin: 0,
          padding: 0,
          borderRadius: 4,
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: 'none',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: colorMode === 'light' ? '#64748B' : '#CBD5E1',
          '&:hover': {
            color: colorMode === 'light' ? '#9CA3AF' : '#CBD5E1',
          },
          '&:focus': {
            color: colorMode === 'light' ? '#9CA3AF' : '#CBD5E1',
          },
          '&:active': {
            color: colorMode === 'light' ? '#9CA3AF' : '#CBD5E1',
          },
        }),
        singleValue: (provided) => ({
          ...provided,
          color: colorMode === 'light' ? '#334155' : '#F9FAFB',
        }),
        input: (provided) => ({
          ...provided,
          color: colorMode === 'light' ? '#334155' : '#F9FAFB',
        }),
        container: (provided) => ({
          ...provided,
          width: 220,
        }),
      }}
    />
  );
}

interface ColorArgs {
  isSelected: boolean;
  lightMode: [string, string];
  darkMode: [string, string];
}

function optionColor(colorMode: string) {
  return ({ isSelected, lightMode, darkMode }: ColorArgs) => {
    if (colorMode === 'light') {
      return isSelected ? lightMode[0] : lightMode[1];
    }
    return isSelected ? darkMode[0] : darkMode[1];
  };
}
