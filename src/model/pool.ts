import { PoolsQuery } from "@/gql/generated/graphql";

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

export type PoolData = {
  address: string;
  token0: {
    address: string;
    symbol: string;
    name: string;
  };
  token1: {
    address: string;
    symbol: string;
    name: string;
  };
  totalValueLockedUSD: number;
  volume24hUSD: number;
};

export const poolsFromQuery = (data: PoolsQuery) => {
  return data.pools
    .filter((pool) => !HIDDEN_POOLS.includes(pool.id))
    .map((pool) => {
      return {
        address: pool.id,
        token0: {
          address: pool.token0.id,
          symbol: pool.token0.symbol,
          name: pool.token0.name,
        },
        token1: {
          address: pool.token1.id,
          symbol: pool.token1.symbol,
          name: pool.token1.name,
        },
        totalValueLockedUSD: parseFloat(pool.totalValueLockedUSD),
        volume24hUSD: parseFloat(pool.poolDayData[0].volumeUSD),
      };
    });
};
