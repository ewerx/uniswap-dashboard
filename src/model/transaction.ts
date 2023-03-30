import { TransactionsQuery } from "@/gql/generated/graphql";

export enum TransactionType {
  SWAP = "SWAP",
  MINT = "MINT",
  BURN = "BURN",
}

export type TransactionData = {
  type: TransactionType;
  hash: string;
  timestamp: Date;
  sender: string;
  token0: {
    address: string;
    symbol: string;
    amount: bigint;
    decimals: number;
  };
  token1: {
    address: string;
    symbol: string;
    amount: bigint;
    decimals: number;
  };
  amountUSD: number;
};

export const transactionsFromQuery = (data: TransactionsQuery) => {
  return data.transactions
    .map((tx) => {
      const swaps: TransactionData[] = tx.swaps.flatMap((swap) => {
        if (swap === null) {
          return [];
        }
        return {
          type: TransactionType.SWAP,
          hash: tx.id,
          timestamp: unixToDate(swap.timestamp),
          sender: swap.origin,
          token0: {
            address: swap.token0.id,
            symbol: swap.token0.symbol,
            amount: swap.amount0,
            decimals: parseInt(swap.token0.decimals),
          },
          token1: {
            address: swap.token1.id,
            symbol: swap.token1.symbol,
            amount: swap.amount1,
            decimals: parseInt(swap.token1.decimals),
          },
          amountUSD: swap.amountUSD,
        };
      });
      const mints: TransactionData[] = tx.mints.flatMap((mint) => {
        if (mint === null) {
          return [];
        }
        return {
          type: TransactionType.MINT,
          hash: tx.id,
          timestamp: unixToDate(mint.timestamp),
          sender: mint.origin,
          token0: {
            address: mint.token0.id,
            symbol: mint.token0.symbol,
            amount: mint.amount0,
            decimals: parseInt(mint.token0.decimals),
          },
          token1: {
            address: mint.token1.id,
            symbol: mint.token1.symbol,
            amount: mint.amount1,
            decimals: parseInt(mint.token1.decimals),
          },
          amountUSD: mint.amountUSD,
        };
      });
      const burns: TransactionData[] = tx.burns.flatMap((burn) => {
        if (burn === null) {
          return [];
        }
        return {
          type: TransactionType.BURN,
          hash: tx.id,
          timestamp: unixToDate(burn.timestamp),
          sender: burn.origin,
          token0: {
            address: burn.token0.id,
            symbol: burn.token0.symbol,
            amount: burn.amount0,
            decimals: parseInt(burn.token0.decimals),
          },
          token1: {
            address: burn.token1.id,
            symbol: burn.token1.symbol,
            amount: burn.amount1,
            decimals: parseInt(burn.token1.decimals),
          },
          amountUSD: burn.amountUSD,
        };
      });
      return [...swaps, ...mints, ...burns];
    })
    .flat();
};

const unixToDate = (unix: number) => {
  return new Date(unix * 1000);
};
