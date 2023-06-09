import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  ssrMode: typeof window === "undefined",
  cache: new InMemoryCache(),
});

export default client;
