import { Table, Badge, Group, Box } from '@mantine/core';
import ClearTableFilter from 'components/clear-table-filter/ClearTableFilter';
import EmptyTable from 'components/empty-table/EmptyTable';
import { Transaction } from 'types/PagesInterfaces';
import { humanizeString } from 'utils/text';

interface TransactionTableProps {
  transactions: Transaction[];
  exchangeRate: number;
  usersMapping: Record<string, string>;
  currencyFilter: 'GCS' | 'ICS' | '';
  setCurrencyFilter: (val: 'GCS' | 'ICS' | '') => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, exchangeRate, usersMapping, setCurrencyFilter }) => {

  const STATUS_COLOR_MAPPING = {
    'inProgress': 'yellow',
    'completed': 'green',
    'blocked': 'red',
  };

  return (
    <Box style={{ overflowX: 'auto' }}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>GCS</Table.Th>
            <Table.Th>ICS</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {(transactions.length < 1) && <EmptyTable
            message="No transactions found"
            colSpan={6}
            actions={transactions.length > 0 ? [<ClearTableFilter handleClick={() => setCurrencyFilter('')} />] : undefined}
          />}
          {transactions.map((transaction: Transaction) => (
            <Table.Tr key={transaction.id}>
              <Table.Td>{new Date(transaction.date).toLocaleDateString()}</Table.Td>
              <Table.Td>{usersMapping[transaction.user]}</Table.Td>
              <Table.Td>
                <Group><Badge color={transaction.currency === 'GCS' ? 'blue' : 'yellow'}>{transaction.currency}</Badge> {transaction.amount} </Group>
              </Table.Td>
              <Table.Td>{transaction.currency === 'GCS' ? transaction.amount.toFixed(2) : (transaction.amount * exchangeRate).toFixed(2)}</Table.Td>
              <Table.Td>{transaction.currency === 'ICS' ? transaction.amount.toFixed(2) : (transaction.amount / exchangeRate).toFixed(2)}</Table.Td>
              <Table.Td c={STATUS_COLOR_MAPPING[transaction.status as 'inProgress' | 'completed' | 'blocked']}>{humanizeString(transaction.status)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default TransactionTable;
