import { PoolsDocument, PoolsQuery } from "@/gql/generated/graphql";
import { poolsFromQuery } from "@/model/pool";
import { formatCurrency } from "@/utils/format";
import { tokenIconUrl } from "@/utils/tokenIcon";
import { useQuery } from "@apollo/client";
import {
  Avatar,
  Card,
  Container,
  Grid,
  Loading,
  Row,
  Table,
} from "@nextui-org/react";

const PoolsTable = () => {
  const { data, loading, fetchMore } = useQuery<PoolsQuery>(PoolsDocument, {
    variables: {
      first: 100,
      skip: 0,
      orderBy: "totalValueLockedUSD",
      orderDirection: "desc",
      poolDayDataCount: 2,
    },
  });

  const pools = data ? poolsFromQuery(data) : [];

  const columns = [
    { uid: "rank", name: "" },
    { uid: "icon", name: "" },
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
        {pools.map((pool, index) => (
          <Table.Row key={pool.address}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <Container gap={1}>
                <Avatar.Group>
                  <Avatar size="xs" src={tokenIconUrl(pool.token0.address)} />
                  <Avatar size="xs" src={tokenIconUrl(pool.token1.address)} />
                </Avatar.Group>
              </Container>
            </Table.Cell>
            <Table.Cell>
              {pool.token0.symbol}/{pool.token1.symbol}
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
