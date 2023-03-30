import { TokensQuery } from "@/gql/generated/graphql";

// from https://github.com/Uniswap/v3-info/blob/master/src/constants/index.ts
const HIDDEN_TOKENS = [
  "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
  "0x7dfb72a2aad08c937706f21421b15bfc34cba9ca",
  "0x12b32f10a499bf40db334efe04226cca00bf2d9b",
  "0x160de4468586b6b2f8a92feb0c260fc6cfc743b1",
];

export type TokenData = {
  address: string;
  symbol: string;
  name: string;
  totalValueLockedUSD: number;
  volumeUSD: number;
  priceUSD: number;
  priceChange24h: number;
};

export const tokensFromQuery = (data: TokensQuery) => {
  return data.tokens
    .filter((token) => !HIDDEN_TOKENS.includes(token.id))
    .map((token) => {
      return {
        address: token.id,
        symbol: token.symbol,
        name: token.name,
        totalValueLockedUSD: parseFloat(token.totalValueLockedUSD),
        volumeUSD: parseFloat(token.volumeUSD),
        priceUSD: parseFloat(token.tokenDayData[0].priceUSD),
        priceChange24h: get24hPriceChange(token.tokenDayData),
      };
    });
};

const get24hPriceChange = (
  tokenDayData: {
    priceUSD: number;
    date: number;
  }[]
) => {
  if (tokenDayData.length < 2) {
    return 0;
  }

  const currentPrice = tokenDayData[0].priceUSD;
  const previousPrice = tokenDayData[1].priceUSD;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;

  return priceChange;
};
