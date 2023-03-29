import { TokensDocument, TokensQuery } from "@/gql/generated/graphql";
import { formatCurrency } from "@/utils/number";
import { tokenIconUrl } from "@/utils/tokenIcon";
import { useQuery } from "@apollo/client";
import {
  Avatar,
  Card,
  Col,
  Container,
  Loading,
  Row,
  Table,
  Text,
} from "@nextui-org/react";

// from https://github.com/Uniswap/v3-info/blob/master/src/constants/index.ts
const HIDDEN_TOKENS = [
  "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
  "0x7dfb72a2aad08c937706f21421b15bfc34cba9ca",
  "0x12b32f10a499bf40db334efe04226cca00bf2d9b",
  "0x160de4468586b6b2f8a92feb0c260fc6cfc743b1",
];

const TokensTable = () => {
  const { data, loading, fetchMore } = useQuery<TokensQuery>(TokensDocument, {
    variables: {
      first: 100,
      skip: 0,
      orderBy: "totalValueLockedUSD",
      orderDirection: "desc",
    },
  });

  const tokens =
    data?.tokens.filter((token) => !HIDDEN_TOKENS.includes(token.id)) || [];

  const columns = [
    { uid: "rank", name: "" },
    { uid: "icon", name: "" },
    { uid: "name", name: "Name" },
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
        {tokens.map((token, index) => (
          <Table.Row key={token.id}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <Avatar size="xs" src={tokenIconUrl(token.id)} />
            </Table.Cell>
            <Table.Cell>
              <Text small size={16}>
                {token.name}
                {"   "}
              </Text>
              <Text small size={16} color="$accents5">
                ({token.symbol})
              </Text>
            </Table.Cell>
            <Table.Cell>{formatCurrency(token.totalValueLockedUSD)}</Table.Cell>
            <Table.Cell>{formatCurrency(token.volumeUSD)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Pagination rowsPerPage={10} align="center" noMargin />
    </Table>
  );
};

export default TokensTable;
