import { useCallback } from 'react';
import { SnackbarStore } from './SnackbarStore';

export const useShowSnackbar = () => {

  const showSnackbar = useCallback(
    ({ text, type = 'success' }: { text: string; type?: 'success' | 'error'; }) => {
      SnackbarStore.set('isVisible', true);
      SnackbarStore.set('text', text);
      SnackbarStore.set('type', type);
    },
    []
  );

  return showSnackbar;
};
