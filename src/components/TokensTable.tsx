import { TokensDocument, TokensQuery } from "@/gql/generated/graphql";
import { tokensFromQuery } from "@/model/token";
import { formatCurrency, formatPercent } from "@/utils/format";
import { tokenIconUrl } from "@/utils/tokenIcon";
import { useQuery } from "@apollo/client";
import { Avatar, Col, Row, Table, Text } from "@nextui-org/react";
import TableLoading from "./TableLoading";

const TokensTable = () => {
  // Fetch token data from the API
  const { data, loading } = useQuery<TokensQuery>(TokensDocument, {
    variables: {
      first: 100,
      skip: 0,
      orderBy: "totalValueLockedUSD",
      orderDirection: "desc",
    },
  });

  // Process the fetched data
  const tokens = data ? tokensFromQuery(data) : [];

  // Define table columns
  const columns = [
    { uid: "rank", name: "#" },
    { uid: "token", name: "Token" },
    { uid: "price", name: "Price (USD)" },
    { uid: "priceChange24h", name: "24h Change" },
    { uid: "totalValueLockedUSD", name: "TVL (USD)" },
  ];

  // Render the price change cell
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

  // Render the loading state or the table with data
  return loading ? (
    <TableLoading />
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
              <Row gap={1} justify="space-evenly">
                <Col span={1.5}>
                  <Avatar size="xs" src={tokenIconUrl(token.address)} />
                </Col>
                <Col>
                  <Text small size={16}>
                    {token.name}
                    {"   "}
                  </Text>
                  <Text small size={16} color="$accents5">
                    ({token.symbol})
                  </Text>
                </Col>
              </Row>
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
