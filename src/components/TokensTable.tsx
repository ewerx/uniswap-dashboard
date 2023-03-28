import { TokensDocument, TokensQuery } from "@/gql/generated/graphql";
import { useQuery } from "@apollo/client";
import { Card, Container, Loading, Row, Table } from "@nextui-org/react";

const TokensTable = () => {
  const { data, loading, fetchMore } = useQuery<TokensQuery>(TokensDocument, {
    variables: {
      first: 10,
      skip: 0,
      orderBy: "totalValueLockedUSD",
      orderDirection: "desc",
    },
  });

  const tokens = data?.tokens || [];

  const loadMore = () => {
    fetchMore({
      variables: { first: 10, skip: tokens.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { ...prev, tokens: [...prev.tokens, ...fetchMoreResult.tokens] };
      },
    });
  };

  const columns = [
    { uid: "name", name: "Name" },
    { uid: "symbol", name: "Symbol" },
    { uid: "totalValueLockedUSD", name: "TVL (USD)" },
    { uid: "volumeUSD", name: "Volume (USD)" },
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
      aria-label="Tokens List"
      css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
      color="secondary"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.uid}>{column.name}</Table.Column>
        )}
      </Table.Header>
      <Table.Body>
        {tokens.map((token) => (
          <Table.Row key={token.id}>
            <Table.Cell>{token.name}</Table.Cell>
            <Table.Cell>{token.symbol}</Table.Cell>
            <Table.Cell>{token.totalValueLockedUSD}</Table.Cell>
            <Table.Cell>{token.volumeUSD}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TokensTable;
