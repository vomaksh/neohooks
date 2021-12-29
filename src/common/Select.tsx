import Select from 'react-select';
import { useColorMode } from '@chakra-ui/react';

interface CustomSelectProps {
  options: { label: string; value: string }[];
  placeholder: string;
}

export function CustomSelect(props: CustomSelectProps) {
  const { colorMode } = useColorMode();
  const { options, placeholder } = props;
  return (
    <Select
      placeholder={placeholder}
      defaultValue={options[0]}
      options={options}
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: colorMode === 'light' ? '#334155' : provided.color,
          backgroundColor: (() => {
            switch (colorMode) {
              case 'light':
                return state.isSelected ? '#CBD5E1' : provided.backgroundColor;
              case 'dark':
                return state.isSelected ? '#4B5563' : '#374151';
              default:
                // this doesn't matter, only for satisfying the linter
                return provided.backgroundColor;
            }
          })(),
          '&:focus': {
            backgroundColor: colorMode === 'light' ? '#E2E8F0' : '#6B7280',
            color: colorMode === 'light' ? '#334155' : provided.color,
          },
          '&:hover': {
            backgroundColor: colorMode === 'light' ? '#E2E8F0' : '#6B7280',
            color: colorMode === 'light' ? '#334155' : provided.color,
          },
          '&:active': {
            backgroundColor: colorMode === 'light' ? '#E2E8F0' : '#6B7280',
            color: colorMode === 'light' ? '#334155' : provided.color,
          },
        }),
        control: (provided) => ({
          ...provided,
          backgroundColor: colorMode === 'light' ? '#F8FAFC' : '#374151',
          borderWidth: colorMode === 'light' ? 2 : 0,
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
          width: 200,
        }),
      }}
    />
  );
}
