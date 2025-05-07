import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEYS } from '../constants';
import { TransactionsApi } from '../../clients/TransactionsApi';

interface UseUpdateTransactionsOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: unknown) => void;
  onSettled?: (data: unknown, error: unknown) => void;
}

export const useUpdateTransactions = (options: UseUpdateTransactionsOptions) => useMutation({
  mutationKey: [MUTATION_KEYS.UPDATE_TRANSACTIONS],
  mutationFn: TransactionsApi.updateTransactions,
  ...options,
});
