export const humanizeString = (input: string): string => {
  if (!input) {
    return '--';
  }
  let normalizedString = input.replace(/([a-z])([A-Z])/g, '$1_$2');

  normalizedString = normalizedString.replace(/[-_]/g, ' ');

  const words = normalizedString.split(' ');

  const humanized = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  return humanized;
};