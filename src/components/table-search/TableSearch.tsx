import { TextInput } from '@mantine/core';
import { TableSearchProps } from '../../types/TableFilterTypes';

export function TableSearch({ value, handleChange, label, placeholder }: TableSearchProps) {
  return (
    <TextInput
      value={value}
      onChange={(event) => handleChange('searchQuery', event.currentTarget.value)}
      label={label ? 'Search ' + label.toLowerCase() : ''}
      placeholder={`${placeholder || 'Search'}...`}
      size="md"
    />
  );
}
