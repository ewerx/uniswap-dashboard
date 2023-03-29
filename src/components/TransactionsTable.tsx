import {
  TransactionsDocument,
  TransactionsQuery,
} from "@/gql/generated/graphql";
import { formatCurrency } from "@/utils/number";
import { useQuery } from "@apollo/client";
import { Card, Container, Loading, Row, Table } from "@nextui-org/react";

const TransactionsTable = () => {
  const { data, loading, fetchMore } = useQuery<TransactionsQuery>(
    TransactionsDocument,
    {
      variables: {
        first: 10,
        skip: 0,
      },
    }
  );

  const transactions = data?.transactions || [];

  const loadMore = () => {
    fetchMore({
      variables: { first: 10, skip: transactions.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          transactions: [...prev.transactions, ...fetchMoreResult.transactions],
        };
      },
    });
  };

  const columns = [
    { uid: "timestamp", name: "Timestamp" },
    { uid: "swap", name: "Swap" },
    { uid: "amount", name: "Amount (USD)" },
  ];

  return loading ? (
    <Container>
      <Card css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}>
        <Card.Body>
          <Row justify="center" align="center" fluid>
            <Loading type="points-opacity" />
          </Row>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <Table
      bordered
      shadow={false}
      aria-label="Transactions List"
      css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
      color="secondary"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.uid}>{column.name}</Table.Column>
        )}
      </Table.Header>
      <Table.Body>
        {transactions.map((transaction) => (
          <Table.Row key={transaction.id}>
            <Table.Cell>{transaction.timestamp}</Table.Cell>
            <Table.Cell>
              {transaction.swaps[0]?.token0.symbol}-
              {transaction.swaps[0]?.token1.symbol}
            </Table.Cell>
            <Table.Cell>
              {formatCurrency(transaction.swaps[0]?.amountUSD)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TransactionsTable;
