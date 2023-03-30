/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query Pools($first: Int = 100, $skip: Int = 0, $orderBy: Pool_orderBy = totalValueLockedUSD, $orderDirection: OrderDirection = desc, $poolDayDataCount: Int = 1, $poolDayDataOrderBy: PoolDayData_orderBy = date, $poolDayDataOrderDirection: OrderDirection = desc) {\n  pools(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n  ) {\n    id\n    token0 {\n      id\n      symbol\n      name\n    }\n    token1 {\n      id\n      symbol\n      name\n    }\n    totalValueLockedUSD\n    volumeUSD\n    poolDayData(\n      first: $poolDayDataCount\n      orderBy: $poolDayDataOrderBy\n      orderDirection: $poolDayDataOrderDirection\n    ) {\n      date\n      open\n      close\n      low\n      high\n      volumeUSD\n      tvlUSD\n    }\n  }\n}": types.PoolsDocument,
    "query Tokens($first: Int = 100, $skip: Int = 0, $orderBy: Token_orderBy = totalValueLockedUSD, $orderDirection: OrderDirection = desc, $tokenDayDataFirst: Int = 2) {\n  tokens(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n  ) {\n    id\n    symbol\n    name\n    totalValueLockedUSD\n    volumeUSD\n    tokenDayData(first: $tokenDayDataFirst, orderBy: date, orderDirection: desc) {\n      date\n      priceUSD\n    }\n  }\n}": types.TokensDocument,
    "query Transactions($first: Int = 100, $skip: Int = 0, $orderBy: Transaction_orderBy = timestamp, $orderDirection: OrderDirection = desc, $where: Transaction_filter = {}) {\n  transactions(\n    skip: $skip\n    first: $first\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n    where: $where\n  ) {\n    id\n    timestamp\n    swaps {\n      id\n      timestamp\n      origin\n      amountUSD\n      amount0\n      amount1\n      token0 {\n        id\n        symbol\n        decimals\n      }\n      token1 {\n        id\n        symbol\n        decimals\n      }\n      pool {\n        id\n      }\n    }\n    mints {\n      id\n      timestamp\n      origin\n      amountUSD\n      amount0\n      amount1\n      token0 {\n        id\n        symbol\n        decimals\n      }\n      token1 {\n        id\n        symbol\n        decimals\n      }\n      pool {\n        id\n      }\n    }\n    burns {\n      id\n      timestamp\n      origin\n      amountUSD\n      amount0\n      amount1\n      token0 {\n        id\n        symbol\n        decimals\n      }\n      token1 {\n        id\n        symbol\n        decimals\n      }\n      pool {\n        id\n      }\n    }\n  }\n}": types.TransactionsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Pools($first: Int = 100, $skip: Int = 0, $orderBy: Pool_orderBy = totalValueLockedUSD, $orderDirection: OrderDirection = desc, $poolDayDataCount: Int = 1, $poolDayDataOrderBy: PoolDayData_orderBy = date, $poolDayDataOrderDirection: OrderDirection = desc) {\n  pools(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n  ) {\n    id\n    token0 {\n      id\n      symbol\n      name\n    }\n    token1 {\n      id\n      symbol\n      name\n    }\n    totalValueLockedUSD\n    volumeUSD\n    poolDayData(\n      first: $poolDayDataCount\n      orderBy: $poolDayDataOrderBy\n      orderDirection: $poolDayDataOrderDirection\n    ) {\n      date\n      open\n      close\n      low\n      high\n      volumeUSD\n      tvlUSD\n    }\n  }\n}"): (typeof documents)["query Pools($first: Int = 100, $skip: Int = 0, $orderBy: Pool_orderBy = totalValueLockedUSD, $orderDirection: OrderDirection = desc, $poolDayDataCount: Int = 1, $poolDayDataOrderBy: PoolDayData_orderBy = date, $poolDayDataOrderDirection: OrderDirection = desc) {\n  pools(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n  ) {\n    id\n    token0 {\n      id\n      symbol\n      name\n    }\n    token1 {\n      id\n      symbol\n      name\n    }\n    totalValueLockedUSD\n    volumeUSD\n    poolDayData(\n      first: $poolDayDataCount\n      orderBy: $poolDayDataOrderBy\n      orderDirection: $poolDayDataOrderDirection\n    ) {\n      date\n      open\n      close\n      low\n      high\n      volumeUSD\n      tvlUSD\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Tokens($first: Int = 100, $skip: Int = 0, $orderBy: Token_orderBy = totalValueLockedUSD, $orderDirection: OrderDirection = desc, $tokenDayDataFirst: Int = 2) {\n  tokens(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n  ) {\n    id\n    symbol\n    name\n    totalValueLockedUSD\n    volumeUSD\n    tokenDayData(first: $tokenDayDataFirst, orderBy: date, orderDirection: desc) {\n      date\n      priceUSD\n    }\n  }\n}"): (typeof documents)["query Tokens($first: Int = 100, $skip: Int = 0, $orderBy: Token_orderBy = totalValueLockedUSD, $orderDirection: OrderDirection = desc, $tokenDayDataFirst: Int = 2) {\n  tokens(\n    first: $first\n    skip: $skip\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n  ) {\n    id\n    symbol\n    name\n    totalValueLockedUSD\n    volumeUSD\n    tokenDayData(first: $tokenDayDataFirst, orderBy: date, orderDirection: desc) {\n      date\n      priceUSD\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Transactions($first: Int = 100, $skip: Int = 0, $orderBy: Transaction_orderBy = timestamp, $orderDirection: OrderDirection = desc, $where: Transaction_filter = {}) {\n  transactions(\n    skip: $skip\n    first: $first\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n    where: $where\n  ) {\n    id\n    timestamp\n    swaps {\n      id\n      timestamp\n      origin\n      amountUSD\n      amount0\n      amount1\n      token0 {\n        id\n        symbol\n        decimals\n      }\n      token1 {\n        id\n        symbol\n        decimals\n      }\n      pool {\n        id\n      }\n    }\n    mints {\n      id\n      timestamp\n      origin\n      amountUSD\n      amount0\n      amount1\n      token0 {\n        id\n        symbol\n        decimals\n      }\n      token1 {\n        id\n        symbol\n        decimals\n      }\n      pool {\n        id\n      }\n    }\n    burns {\n      id\n      timestamp\n      origin\n      amountUSD\n      amount0\n      amount1\n      token0 {\n        id\n        symbol\n        decimals\n      }\n      token1 {\n        id\n        symbol\n        decimals\n      }\n      pool {\n        id\n      }\n    }\n  }\n}"): (typeof documents)["query Transactions($first: Int = 100, $skip: Int = 0, $orderBy: Transaction_orderBy = timestamp, $orderDirection: OrderDirection = desc, $where: Transaction_filter = {}) {\n  transactions(\n    skip: $skip\n    first: $first\n    orderBy: $orderBy\n    orderDirection: $orderDirection\n    where: $where\n  ) {\n    id\n    timestamp\n    swaps {\n      id\n      timestamp\n      origin\n      amountUSD\n      amount0\n      amount1\n      token0 {\n        id\n        symbol\n        decimals\n      }\n      token1 {\n        id\n        symbol\n        decimals\n      }\n      pool {\n        id\n      }\n    }\n    mints {\n      id\n      timestamp\n      origin\n      amountUSD\n      amount0\n      amount1\n      token0 {\n        id\n        symbol\n        decimals\n      }\n      token1 {\n        id\n        symbol\n        decimals\n      }\n      pool {\n        id\n      }\n    }\n    burns {\n      id\n      timestamp\n      origin\n      amountUSD\n      amount0\n      amount1\n      token0 {\n        id\n        symbol\n        decimals\n      }\n      token1 {\n        id\n        symbol\n        decimals\n      }\n      pool {\n        id\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;