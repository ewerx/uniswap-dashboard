import {
  TransactionsDocument,
  TransactionsQuery,
} from "@/gql/generated/graphql";
import {
  transactionsFromQuery,
  TransactionData,
  TransactionType,
} from "@/model/transaction";
import { addressUrl, transactionUrl } from "@/utils/etherscan";
import {
  formatCurrency,
  formatTimestamp,
  formatTokenAmount,
  truncateMiddle,
} from "@/utils/format";
import { useQuery } from "@apollo/client";
import {
  Card,
  Container,
  Link,
  Loading,
  Row,
  Table,
  Text,
  Tooltip,
} from "@nextui-org/react";
import { TransactionTypeBadge } from "./styles/TransactionTypeBadge";

const TransactionsTable = () => {
  const { data, loading, fetchMore } = useQuery<TransactionsQuery>(
    TransactionsDocument,
    {
      variables: {
        first: 100,
        skip: 0,
      },
    }
  );

  const transactions = data ? transactionsFromQuery(data) : [];

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
    { uid: "type", name: "Type" },
    { uid: "tokens", name: "Tokens" },
    { uid: "amount", name: "Amount (USD)" },
    { uid: "sender", name: "Sender" },
    { uid: "timestamp", name: "Timestamp" },
  ];

  const renderTransactionDetails = (tx: TransactionData) => {
    switch (tx.type) {
      case TransactionType.SWAP:
        const inToken = tx.token0.amount < 0 ? tx.token0 : tx.token1;
        const outToken = tx.token0.amount < 0 ? tx.token1 : tx.token0;

        return (
          <>
            <Text small size={16}>
              {formatTokenAmount(outToken.amount)}{" "}
            </Text>
            <Text small size={16} color="$accents7">
              {outToken.symbol}
            </Text>
            <Text small size={16} color="$accents8">
              {" → "}
            </Text>
            <Text small size={16}>
              {formatTokenAmount(inToken.amount)}{" "}
            </Text>
            <Text small size={16} color="$accents7">
              {inToken.symbol}
            </Text>
          </>
        );

      case TransactionType.MINT: //passthrough
      case TransactionType.BURN:
        return (
          <>
            <Text small size={16}>
              {formatTokenAmount(tx.token0.amount)}{" "}
            </Text>
            <Text small size={16} color="$accents7">
              {tx.token0.symbol}
            </Text>
            <Text small size={16} color="$accents8">
              {" + "}
            </Text>
            <Text small size={16}>
              {formatTokenAmount(tx.token1.amount)}{" "}
            </Text>
            <Text small size={16} color="$accents7">
              {tx.token1.symbol}
            </Text>
          </>
        );
    }
  };

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
          <Table.Row key={transaction.hash}>
            <Table.Cell>
              <TransactionTypeBadge type={transaction.type} />
            </Table.Cell>
            <Table.Cell>{renderTransactionDetails(transaction)}</Table.Cell>
            <Table.Cell>{formatCurrency(transaction.amountUSD)}</Table.Cell>
            <Table.Cell>
              <Tooltip content={transaction.sender}>
                <Link href={addressUrl(transaction.sender)} target="_blank">
                  {truncateMiddle(transaction.sender)}
                </Link>
              </Tooltip>
            </Table.Cell>
            <Table.Cell>
              <Link href={transactionUrl(transaction.hash)} target="_blank">
                {formatTimestamp(transaction.timestamp)}
              </Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Pagination rowsPerPage={10} align="center" noMargin />
    </Table>
  );
};

export default TransactionsTable;
