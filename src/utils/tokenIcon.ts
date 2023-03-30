import { getAddress } from "viem";

/**
 * Generate the URL for a token's icon based on its Ethereum address.
 * @param {string} address - The Ethereum address of the token.
 * @returns {string} The URL for the token's icon.
 */
export const tokenIconUrl = (address: string) => {
  const checksummedAddress = getAddress(address);
  return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/${checksummedAddress}/logo.png`;
};
