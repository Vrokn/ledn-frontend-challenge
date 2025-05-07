import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { TransactionsApi } from '../../clients/TransactionsApi';

export const useTransactions = () =>
  useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS],
    queryFn: TransactionsApi.getAllTransactions
  });

export const useTransaction = (transactionId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.TRANSACTION, transactionId],
    queryFn: () => TransactionsApi.getTransaction(transactionId),
    enabled: !!transactionId,
  });

export const useTransactionsByUserIds = (userIds: string | string[]) =>
  useQuery(
    {
      queryKey: [QUERY_KEYS.TRANSACTIONS_BY_USERS, userIds],
      queryFn: () => TransactionsApi.getTransactionsByUserIds(userIds),
      enabled: !!userIds && (Array.isArray(userIds) ? userIds.length > 0 : true),
    }
  );
