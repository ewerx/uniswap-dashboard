import { PoolsDocument, PoolsQuery } from "@/gql/generated/graphql";
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

// from https://github.com/Uniswap/v3-info/blob/master/src/constants/index.ts
const HIDDEN_POOLS = [
  "0x86d257cdb7bc9c0df10e84c8709697f92770b335",
  "0xf8dbd52488978a79dfe6ffbd81a01fc5948bf9ee",
  "0x8fe8d9bb8eeba3ed688069c3d6b556c9ca258248",
  "0xa850478adaace4c08fc61de44d8cf3b64f359bec",
  "0x277667eb3e34f134adf870be9550e9f323d0dc24",
  "0x8c0411f2ad5470a66cb2e9c64536cfb8dcd54d51",
  "0x055284a4ca6532ecc219ac06b577d540c686669d",
];

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

  const pools =
    data?.pools.filter((pool) => !HIDDEN_POOLS.includes(pool.id)) || [];

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
          <Table.Row key={pool.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <Container gap={1}>
                <Avatar.Group>
                  <Avatar size="xs" src={tokenIconUrl(pool.token0.id)} />
                  <Avatar size="xs" src={tokenIconUrl(pool.token1.id)} />
                </Avatar.Group>
              </Container>
            </Table.Cell>
            <Table.Cell>
              {pool.token0.symbol}/{pool.token1.symbol}
            </Table.Cell>
            <Table.Cell>
              {formatCurrency(pool.totalValueLockedUSD, "USD")}
            </Table.Cell>
            <Table.Cell>
              {formatCurrency(pool.poolDayData[1].volumeUSD, "USD")}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Pagination rowsPerPage={10} align="center" noMargin />
    </Table>
  );
};

export default PoolsTable;
