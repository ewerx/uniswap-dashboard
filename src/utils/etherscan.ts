export const addressUrl = (address: string) => {
  return `https://etherscan.io/address/${address}`;
};

export const transactionUrl = (hash: string) => {
  return `https://etherscan.io/tx/${hash}`;
};
