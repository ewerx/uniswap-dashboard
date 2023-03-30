import { TransactionsQuery } from "@/gql/generated/graphql";
import { transactionsFromQuery, TransactionType } from "../transaction";
import { loadFixture } from "../../../test-utils/loadFixture";

describe("transactionsFromQuery", () => {
  it("should flatten and process transactions correctly", () => {
    const transactionsQueryResponse = loadFixture<TransactionsQuery>(
      "transactionsQueryResponse.json"
    );
    const result = transactionsFromQuery(transactionsQueryResponse);

    // Check the length of the flattened transactions array
    expect(result.length).toBe(3);

    expect(result[0]).toEqual({
      type: TransactionType.SWAP,
      hash: "0xf979c8898d6f4c7bc209ab5f7307f61532908b7b1f428f93b1b49488b52c85bf",
      timestamp: new Date(1680139043 * 1000),
      sender: "0xadbe190d8557eec6710a224d8ea0c9b64a04bc1d",
      token0: {
        address: "0x06450dee7fd2fb8e39061434babcfc05599a6fb8",
        symbol: "XEN",
        amount: "-1216020330.048407053731570356",
        decimals: 18,
      },
      token1: {
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        symbol: "WETH",
        amount: "0.900041658637447965",
        decimals: 18,
      },
      amountUSD: "1608.208338001980864900478353160687",
    });

    expect(result[1]).toEqual({
      type: TransactionType.MINT,
      hash: "0xef90fe192b90ee33cec063d6e6ccac9c4901a7a34005405bfaaed09b4293e101",
      timestamp: new Date(1680140867 * 1000),
      sender: "0xdd8ef55055e01d39cb87571bd38c43ab9b5903a5",
      token0: {
        address: "0x4d224452801aced8b2f0aebe155379bb5d594381",
        symbol: "APE",
        amount: "56883.925367493262",
        decimals: 18,
      },
      token1: {
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        symbol: "WETH",
        amount: "3694.403860478415333238",
        decimals: 18,
      },
      amountUSD: "6838836.618376278191531629734942729",
    });

    expect(result[2]).toEqual({
      type: TransactionType.BURN,
      hash: "0xba9bbb08e4574206dd9d47b5fb15c0e05a925bf53502f8583a006413b3896ade",
      timestamp: new Date(1680140687 * 1000),
      sender: "0x4e78adc87f5f5fe1539a15735789cb356c5f44c4",
      token0: {
        address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        symbol: "WBTC",
        amount: "0.18092984",
        decimals: 8,
      },
      token1: {
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        symbol: "WETH",
        amount: "2.872547564740240762",
        decimals: 18,
      },
      amountUSD: "10256.96744280206809764875885665914",
    });
  });
});
