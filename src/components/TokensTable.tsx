import { TokensDocument, TokensQuery } from "@/gql/generated/graphql";
import { tokensFromQuery } from "@/model/token";
import { formatCurrency, formatPercent } from "@/utils/format";
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
import { render } from "react-dom";

const TokensTable = () => {
  const { data, loading, fetchMore } = useQuery<TokensQuery>(TokensDocument, {
    variables: {
      first: 100,
      skip: 0,
      orderBy: "totalValueLockedUSD",
      orderDirection: "desc",
    },
  });

  const tokens = data ? tokensFromQuery(data) : [];

  const columns = [
    { uid: "rank", name: "" },
    { uid: "icon", name: "" },
    { uid: "name", name: "Name" },
    { uid: "price", name: "Price (USD)" },
    { uid: "priceChange24h", name: "24h Change" },
    { uid: "totalValueLockedUSD", name: "TVL (USD)" },
  ];

  const renderPriceChange = (priceChange24h: number) => {
    const color =
      priceChange24h > 0
        ? "success"
        : priceChange24h < 0
        ? "error"
        : "$accents7";
    return (
      <Text small size={16} color={color}>
        {formatPercent(priceChange24h)}
      </Text>
    );
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
          <Table.Row key={token.address}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <Avatar size="xs" src={tokenIconUrl(token.address)} />
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
            <Table.Cell>{formatCurrency(token.priceUSD)}</Table.Cell>
            <Table.Cell>{renderPriceChange(token.priceChange24h)}</Table.Cell>
            <Table.Cell>{formatCurrency(token.totalValueLockedUSD)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Pagination rowsPerPage={10} align="center" noMargin />
    </Table>
  );
};

export default TokensTable;
