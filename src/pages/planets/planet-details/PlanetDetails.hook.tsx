import { useUpdateTransactions } from 'api/mutations/transactions/useTransactionsMutation ';
import { useExchangeRate } from 'api/queries/exchange-rate/useExchangeRateQuery';
import { usePlanet } from 'api/queries/planets/usePlanetsQuery';
import { useTransactionsByUserIds } from 'api/queries/transactions/useTransactionsQuery';
import { useUsersByPlanet } from 'api/queries/users/useUsersQuery';
import { useShowSnackbar } from 'providers/snackbar_provider/useShowSnackbar';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Transaction } from 'types/PagesInterfaces';

export const usePlanetDetailsHook = () => {
  const { planetId } = useParams<{ planetId: string; }>();
  const showSnackbar = useShowSnackbar();

  const { data: planetData, isLoading: loadingPlanet } = usePlanet(planetId || '');
  const planet = planetData?.planet || null;

  const { data: exchangeRateData, isLoading: loadingRate } = useExchangeRate();
  const { data: fetchedTransactions, isLoading: loadingTransactions } = useTransactionsByUserIds(planet?.residents || []);
  const { data: usersData, isLoading: loadingUsers } = useUsersByPlanet(planetId || '');

  const users = useMemo(() => usersData?.users || [], [usersData]);

  const [localTransactions, setLocalTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (fetchedTransactions) {
      setLocalTransactions(fetchedTransactions);
    }
  }, [fetchedTransactions]);

  const UsersMapping = useMemo(() => {
    return users.reduce((acc: any, user: any) => {
      acc[user.id] = user.name;
      return acc;
    }, {});
  }, [users]);

  const [currencyFilter, setCurrencyFilter] = useState<'GCS' | 'ICS' | ''>('');
  const exchangeRate = exchangeRateData?.rate || 1;

  const filteredTransactions = useMemo(() => {
    return localTransactions.filter(transaction => !currencyFilter || transaction.currency === currencyFilter);
  }, [localTransactions, currencyFilter]);

  const total = useMemo(() => {
    let totalGCS = 0;
    let totalICS = 0;
    localTransactions.forEach(transaction => {
      const amount = Math.abs(transaction.amount);
      if (transaction.currency === 'GCS') {
        totalGCS += amount;
        totalICS += amount / exchangeRate;
      } else {
        totalICS += amount;
        totalGCS += amount * exchangeRate;
      }
    });
    return { totalGCS, totalICS };
  }, [localTransactions, exchangeRate]);

  const updateTransactionsMutation = useUpdateTransactions({
    onSuccess: () => {
      showSnackbar({ text: 'Transactions updated to "blocked"' });

      setLocalTransactions(prev =>
        prev.map(transaction =>
          transaction.status === 'inProgress' ? { ...transaction, status: 'blocked' } : transaction
        )
      );
    },
    onError: (error) => {
      showSnackbar({ text: `Failed to update transactions ${error}`, type: 'error' });
    }
  });

  const blockInProgressTransactions = () => {
    const toUpdate = localTransactions
      .filter(transaction => transaction.status === 'inProgress')
      .map(transaction => ({
        ...transaction,
        status: 'blocked'
      }));

    if (toUpdate.length > 0) {
      updateTransactionsMutation.mutate(toUpdate);
    }
  };

  const isLoading = loadingPlanet || loadingRate || loadingTransactions || loadingUsers;

  return {
    currencyFilter,
    exchangeRate,
    filteredTransactions,
    isLoading,
    planet,
    setCurrencyFilter,
    total,
    transactions: localTransactions,
    users,
    UsersMapping,
    blockInProgressTransactions,
  };
};