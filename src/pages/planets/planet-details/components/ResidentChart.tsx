import { Title, Box, Stack, SimpleGrid } from '@mantine/core';
import { DonutChart } from '@mantine/charts';
import { useCallback, useMemo } from 'react';
import { Transaction, User } from 'types/PagesInterfaces';

interface ResidentChartProps {
  transactions: Transaction[];
  users: User[];
  exchangeRate: string;
}

const ResidentChart: React.FC<ResidentChartProps> = ({ transactions, users }) => {

  const usersMapping = useMemo(() => {
    return users?.reduce<Record<string, string>>((acc, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {});
  }, [users]);

  const getCurrencyData = useCallback((currency: 'GCS' | 'ICS') => {
    return users.map((user: User) => {
      const total = transactions
        .filter(
          (transaction: Transaction) =>
            transaction.currency === currency &&
            transaction.user.toString() === user.id
        )
        .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

      return {
        name: usersMapping[user.id].split(' ')[0] ?? `User ${user.id}`,
        value: Math.abs(parseFloat(total.toFixed(2))),
        color: `#${Math.random().toString(16).slice(-6)}`,
      };
    });

  }, [transactions, usersMapping, users]);

  const gcsData = useMemo(() => getCurrencyData('GCS'), [getCurrencyData]);
  const icsData = useMemo(() => getCurrencyData('ICS'), [getCurrencyData]);

  return (
    <Stack >
      <Title order={4}>Transactions amount moved Summary </Title>
      <SimpleGrid mt="sm" cols={{ base: 1, md: 2 }}>
        {gcsData.length > 0 && (
          <Box>
            <Title order={5} mb="sm">GCS Transactions</Title>
            <DonutChart data={gcsData} size={120} thickness={25} />
          </Box>
        )}
        {icsData.length > 0 && (
          <Box>
            <Title order={5} mb="sm">ICS Transactions</Title>
            <DonutChart data={icsData} size={120} thickness={25} />
          </Box>
        )}
      </SimpleGrid>
    </Stack>
  );
};

export default ResidentChart;
