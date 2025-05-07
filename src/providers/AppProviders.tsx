import React, { Suspense } from 'react';
import { SnackbarProvider } from './snackbar_provider/SnackbarProvider';
import { LoadingFallback } from '../components/loading-fallback/LoadingFallback';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {

  const queryClient = new QueryClient();
  const theme = createTheme({});

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <SnackbarProvider>
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
        </SnackbarProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
