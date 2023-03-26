import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  documents: "src/gql/**/*.graphql",
  generates: {
    "src/gql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
