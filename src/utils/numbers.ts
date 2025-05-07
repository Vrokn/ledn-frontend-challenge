export const formatNumbers = (value: string): string => {
  const numberValue = parseFloat(value);
  
  if (isNaN(numberValue)) {
    return 'Unknown';
  }
  return Intl.NumberFormat().format(numberValue);
}

