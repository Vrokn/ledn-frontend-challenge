import { ReactNode } from 'react';
import { useStoreValue } from 'zustand-x';
import { SnackbarStore } from './SnackbarStore';
import { Notification, Text, Box } from '@mantine/core';

export const SnackbarProvider = ({ children }: { children: ReactNode; }) => {
  const isVisible = useStoreValue(SnackbarStore, 'isVisible');
  const rawText = useStoreValue(SnackbarStore, 'text');
  const type = useStoreValue(SnackbarStore, 'type');

  let text: string;
  if (typeof rawText === 'string') {
    text = rawText;
  } else if (typeof rawText === 'object' && rawText !== null) {
    text = JSON.stringify(rawText, null, 2);
  } else {
    text = 'An unexpected error occurred.';
  }

  let lines: ReactNode;
  try {
    lines = text.split('\n\n').map((block, i) => (
      <div key={i}>
        {block.split('\n').map((line, j) => (
          <Text size="sm" key={j}>
            {line}
          </Text>
        ))}
        {i < text.split('\n\n').length - 1 && <div style={{ marginBottom: 12 }} />}
      </div>
    ));
  } catch (err) {
    lines = <Text c="red">Failed to render message.</Text>;
  }

  return (
    <>
      {children}

      {isVisible && (
        <Box
          pos="fixed"
          bottom={16}
          right={16}
          style={{ zIndex: 9999, maxWidth: 360 }}
        >
          <Notification
            onClose={() => SnackbarStore.set('isVisible', false)}
            color={type === 'success' ? 'green' : 'red'}
            title={type === 'success' ? 'Success' : 'Error'}
            withCloseButton
            radius="md"
          >
            {lines}
          </Notification>
        </Box>
      )}
    </>
  );
};
