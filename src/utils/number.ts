export const formatCurrency = (amount: number, currency = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
  });

  return formatter.format(amount);
};
