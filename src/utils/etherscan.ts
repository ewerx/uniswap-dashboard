// Utility functions for generating block explorer URLs

/**
 * Generate the Etherscan URL for a given Ethereum address.
 * @param {string} address - The Ethereum address.
 * @returns {string} The Etherscan URL for the address.
 */
export const addressUrl = (address: string) => {
  return `https://etherscan.io/address/${address}`;
};

/**
 * Generate the Etherscan URL for a given Ethereum transaction hash.
 * @param {string} hash - The Ethereum transaction hash.
 * @returns {string} The Etherscan URL for the transaction.
 */
export const transactionUrl = (hash: string) => {
  return `https://etherscan.io/tx/${hash}`;
};
