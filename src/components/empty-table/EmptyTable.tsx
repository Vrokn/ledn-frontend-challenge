import { Center, Table } from "@mantine/core";


interface EmptyTableProps {
  actions?: React.ReactNode[];
  message: string;
  colSpan?: number;
}

function EmptyTable({ actions, message, colSpan }: EmptyTableProps) {
  return (
    <Table.Tr >
      <Table.Td colSpan={colSpan}>
        <Center>
          <span>{message}</span>
          <br />
          {actions?.map((action, index) => <div key={index}>{action}</div>)}
        </Center>
      </Table.Td>
    </Table.Tr>
  );
}

export default EmptyTable;