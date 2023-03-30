import { PoolsDocument, PoolsQuery } from "@/gql/generated/graphql";
import { poolsFromQuery } from "@/model/pool";
import { formatCurrency } from "@/utils/format";
import { tokenIconUrl } from "@/utils/tokenIcon";
import { useQuery } from "@apollo/client";
import { Avatar, Col, Row, Table } from "@nextui-org/react";
import TableLoading from "./TableLoading";

// PoolsTable is a component to display a list of liquidity pools
// with their respective token pairs, total value locked (TVL),
// and trading volume in the last 24 hours.
const PoolsTable = () => {
  // Fetch pools data from the API
  const { data, loading } = useQuery<PoolsQuery>(PoolsDocument, {
    variables: {
      first: 100,
      skip: 0,
      orderBy: "totalValueLockedUSD",
      orderDirection: "desc",
      poolDayDataCount: 2,
    },
  });

  // Process the fetched data
  const pools = data ? poolsFromQuery(data) : [];

  // Define table columns
  const columns = [
    { uid: "rank", name: "#" },
    { uid: "pool", name: "Pool" },
    { uid: "totalValueLockedUSD", name: "TVL (USD)" },
    { uid: "volumeUSD", name: "24h Volume (USD)" },
  ];

  // Render the loading state or the table with data
  return loading ? (
    <TableLoading />
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
        {pools.map((pool, index) => (
          <Table.Row key={pool.address}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <Row gap={1} justify="space-evenly">
                <Col span={1.5}>
                  <Avatar.Group>
                    <Avatar size="xs" src={tokenIconUrl(pool.token0.address)} />
                    <Avatar size="xs" src={tokenIconUrl(pool.token1.address)} />
                  </Avatar.Group>
                </Col>
                <Col>
                  {pool.token0.symbol}/{pool.token1.symbol}
                </Col>
              </Row>
            </Table.Cell>
            <Table.Cell>
              {formatCurrency(pool.totalValueLockedUSD, "USD")}
            </Table.Cell>
            <Table.Cell>{formatCurrency(pool.volume24hUSD, "USD")}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Pagination rowsPerPage={10} align="center" noMargin />
    </Table>
  );
};

export default PoolsTable;
