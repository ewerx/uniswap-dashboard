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
    "query Pools($first: Int = 1, $skip: Int = 0, $orderBy: Pool_orderBy = totalValueLockedUSD, $orderDirection: OrderDirection = desc) {\n  pools(\n    orderBy: $orderBy\n    first: $first\n    skip: $skip\n    orderDirection: $orderDirection\n  ) {\n    id\n    token0 {\n      symbol\n      name\n    }\n    token1 {\n      symbol\n      name\n    }\n    totalValueLockedUSD\n    poolDayData(first: 2, skip: 0, orderBy: date, orderDirection: desc) {\n      volumeUSD\n    }\n  }\n}": types.PoolsDocument,
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
export function graphql(source: "query Pools($first: Int = 1, $skip: Int = 0, $orderBy: Pool_orderBy = totalValueLockedUSD, $orderDirection: OrderDirection = desc) {\n  pools(\n    orderBy: $orderBy\n    first: $first\n    skip: $skip\n    orderDirection: $orderDirection\n  ) {\n    id\n    token0 {\n      symbol\n      name\n    }\n    token1 {\n      symbol\n      name\n    }\n    totalValueLockedUSD\n    poolDayData(first: 2, skip: 0, orderBy: date, orderDirection: desc) {\n      volumeUSD\n    }\n  }\n}"): (typeof documents)["query Pools($first: Int = 1, $skip: Int = 0, $orderBy: Pool_orderBy = totalValueLockedUSD, $orderDirection: OrderDirection = desc) {\n  pools(\n    orderBy: $orderBy\n    first: $first\n    skip: $skip\n    orderDirection: $orderDirection\n  ) {\n    id\n    token0 {\n      symbol\n      name\n    }\n    token1 {\n      symbol\n      name\n    }\n    totalValueLockedUSD\n    poolDayData(first: 2, skip: 0, orderBy: date, orderDirection: desc) {\n      volumeUSD\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;