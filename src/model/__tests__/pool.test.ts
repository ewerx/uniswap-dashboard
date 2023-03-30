import { PoolsQuery } from "@/gql/generated/graphql";
import { PoolData, poolsFromQuery } from "@/model/pool";
import { loadFixture } from "../../../test-utils/loadFixture";

describe("poolsFromQuery", () => {
  it("should process pools correctly", () => {
    const poolsQueryResponse = loadFixture<PoolsQuery>(
      "poolsQueryResponse.json"
    );
    const result = poolsFromQuery(poolsQueryResponse);

    expect(result.length).toBe(3);

    expect(result[0]).toEqual<PoolData>({
      address: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
      token0: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        symbol: "USDC",
        name: "USD Coin",
      },
      token1: {
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        symbol: "WETH",
        name: "Wrapped Ether",
      },
      totalValueLockedUSD: 435091949.614198056018606731919724,
      volume24hUSD: 20577008.15667677352012831000398131,
    });

    // Check the data of the second pool
    expect(result[1]).toEqual<PoolData>({
      address: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
      token0: {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        symbol: "USDC",
        name: "USD Coin",
      },
      token1: {
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        symbol: "WETH",
        name: "Wrapped Ether",
      },
      totalValueLockedUSD: 315844672.2738612725188951337915829,
      volume24hUSD: 1102072.900093457290515924418041823,
    });

    expect(result[2]).toEqual<PoolData>({
      address: "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed",
      token0: {
        address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        symbol: "WBTC",
        name: "Wrapped BTC",
      },
      token1: {
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        symbol: "WETH",
        name: "Wrapped Ether",
      },
      totalValueLockedUSD: 308277293.5004438491399965150536979,
      volume24hUSD: 334506.5921282639055801851599716771,
    });
  });
});
