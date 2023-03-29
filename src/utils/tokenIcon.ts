import { getAddress } from "viem";

export const tokenIconUrl = (address: string) => {
  const checksummedAddress = getAddress(address);
  return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/${checksummedAddress}/logo.png`;
};
