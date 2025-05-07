import { createStore } from 'zustand-x';

export interface SnackbarState {
  text: string;
  isVisible: boolean;
  type: 'success' | 'error';
}

export const SnackbarStoreState = createStore<SnackbarState>(
  {
    text: '',
    isVisible: false,
    type: 'success',
  },
  {
    name: 'SnackbarStore',
  }
);

export const SnackbarStore = SnackbarStoreState.extendActions(
  ({ set }) => ({
    resetState: () => {
      set('state', (draft) => {
        draft.text = '';
        draft.isVisible = false;
        draft.type = 'success';
      });
    },
  })
);
