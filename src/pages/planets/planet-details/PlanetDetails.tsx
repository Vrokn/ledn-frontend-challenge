import {
  Box,
  Title,
  Text,
  Group,
  Stack,
  Grid,
  Button,
} from '@mantine/core';
import ResidentChart from './components/ResidentChart';
import PlanetInfo from './components/PlanetInfo';
import TransactionTable from './components/transactions-table/TransactionsTable';
import CustomSelect from 'components/custom-select/CustomSelect';
import { LoadingFallback } from 'components/loading-fallback/LoadingFallback';
import { usePlanetDetailsHook } from './PlanetDetails.hook';
import { CURRENCIES } from './PlanetDetails.consts';

const PlanetDetails = () => {
  const {
    currencyFilter,
    exchangeRate,
    filteredTransactions,
    isLoading,
    planet,
    setCurrencyFilter,
    total,
    transactions,
    users,
    UsersMapping,
    blockInProgressTransactions
  } = usePlanetDetailsHook();

  if (isLoading) {
    <LoadingFallback />;
  }

  return (
    <Box p='md'>
      <PlanetInfo planet={planet} users={users} />
      <Group gap="xs" >
        <Title order={4} my="md">Transactions</Title>
        {!transactions && <Text>No transactions found</Text>}

      </Group>
      {transactions?.length > 1 && (
        <>
          <Box mb="md">
            <CustomSelect
              placeholder='Select currency'
              label="Filter by currency"
              name="currency"
              value={currencyFilter}
              onChange={(value: string) => setCurrencyFilter(value as 'GCS' | 'ICS' | '')}
              options={CURRENCIES}
              clearable
            />
          </Box>
          <TransactionTable
            transactions={filteredTransactions}
            exchangeRate={exchangeRate}
            usersMapping={UsersMapping}
            currencyFilter={currencyFilter}
            setCurrencyFilter={setCurrencyFilter}
          />
          <Button
            fullWidth
            loading={isLoading}
            variant='outline'
            color='red'
            onClick={blockInProgressTransactions}
            mt='sm'
          >
            Block All In-Progress Transactions
          </Button>
        </>)}
      <Grid mt='lg' align='center'>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Stack>
            <Title order={4}>Totals</Title>
            <Text><strong>GCS:</strong> {Intl.NumberFormat().format(total.totalGCS)}</Text>
            <Text><strong>ICS:</strong> {Intl.NumberFormat().format(total.totalICS)}</Text>
            <Text><strong>Exchange Rate:</strong> 1 GCS = {exchangeRate} ICS</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          {transactions?.length > 1 && (
            <>
              <ResidentChart
                transactions={transactions || []}
                users={users}
                exchangeRate={exchangeRate}
              />
            </>)}
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default PlanetDetails;
