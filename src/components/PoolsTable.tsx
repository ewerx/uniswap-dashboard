import { PoolsDocument, PoolsQuery } from "@/gql/generated/graphql";
import { useQuery } from "@apollo/client";
import { Card, Container, Loading, Row, Table } from "@nextui-org/react";

const PoolsTable = () => {
  const { data, loading, fetchMore } = useQuery<PoolsQuery>(PoolsDocument, {
    variables: {
      first: 10,
      skip: 0,
      orderBy: "totalValueLockedUSD",
      orderDirection: "desc",
    },
  });

  const pools = data?.pools || [];

  const loadMore = () => {
    fetchMore({
      variables: { first: 10, skip: pools.length },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { ...prev, pools: [...prev.pools, ...fetchMoreResult.pools] };
      },
    });
  };

  const columns = [
    { uid: "pool", name: "Pool" },
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
      aria-label="Pools List"
      css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
      color="secondary"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.uid}>{column.name}</Table.Column>
        )}
      </Table.Header>
      <Table.Body>
        {pools.map((pool) => (
          <Table.Row key={pool.id}>
            <Table.Cell>
              {pool.token0.symbol}/{pool.token1.symbol}
            </Table.Cell>
            <Table.Cell>{pool.totalValueLockedUSD}</Table.Cell>
            <Table.Cell>{pool.volumeUSD}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default PoolsTable;
