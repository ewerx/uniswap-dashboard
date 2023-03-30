import { TokensQuery } from "@/gql/generated/graphql";
import { TokenData, tokensFromQuery } from "../token";
import { loadFixture } from "../../../test-utils/loadFixture";

describe("tokensFromQuery", () => {
  it("should process tokens correctly", () => {
    const tokensQueryResponse = loadFixture<TokensQuery>(
      "tokensQueryResponse.json"
    );
    const result = tokensFromQuery(tokensQueryResponse);

    expect(result.length).toBe(2);

    expect(result[0]).toEqual<TokenData>({
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      symbol: "WETH",
      name: "Wrapped Ether",
      totalValueLockedUSD: 1184125019.401257548027238623941879,
      volumeUSD: 748252174791.3896565327100461371091,
      priceUSD: 1788.728001834675903937880302580104,
      priceChange24h:
        ((1788.728001834675903937880302580104 -
          1792.512497969295447432797145617816) /
          1792.512497969295447432797145617816) *
        100,
    });

    expect(result[1]).toEqual<TokenData>({
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      symbol: "USDC",
      name: "USD Coin",
      totalValueLockedUSD: 665190890.8916900000000000000000001,
      volumeUSD: 589537384534.8390333319317065799647,
      priceUSD: 1,
      priceChange24h:
        ((1 - 0.9999999999999999999999999999999999) /
          0.9999999999999999999999999999999999) *
        100,
    });
  });
});
