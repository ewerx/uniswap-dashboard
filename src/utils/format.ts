// Utility functions for formatting various data types

/**
 * Format a number as a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} [currency="USD"] - The currency code to use (e.g., "USD").
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount: number, currency = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: amount < 1000 ? 2 : 1,
  });

  return formatter.format(amount);
};

/**
 * Format a number as a percentage string.
 * @param {number} amount - The amount to format.
 * @returns {string} The formatted percentage string.
 */
export const formatPercent = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return formatter.format(amount);
};

/**
 * Format a bigint number using the compact notation.
 * @param {bigint} amount - The amount to format.
 * @returns {string} The formatted bigint string.
 */
export const formatTokenAmount = (amount: bigint) => {
  const absAmount = amount < 0 ? -amount : amount;
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
  });

  return formatter.format(absAmount);
};

/**
 * Format a timestamp as a relative time string.
 * @param {Date} timestamp - The timestamp to format.
 * @returns {string} The formatted relative time string.
 */
export const formatTimestamp = (timestamp: Date) => {
  const formatter = new Intl.RelativeTimeFormat("en", {
    style: "narrow",
    numeric: "auto",
  });

  const delta = Math.floor((Date.now() - timestamp.getTime()) / 1000);

  const MINUTE = 60;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  if (delta < MINUTE) {
    return formatter.format(-delta, "second");
  }

  if (delta < HOUR) {
    return formatter.format(-Math.floor(delta / MINUTE), "minute");
  }

  if (delta < DAY) {
    return formatter.format(-Math.floor(delta / HOUR), "hour");
  }

  return formatter.format(-Math.floor(delta / DAY), "day");
};

/**
 * Truncate a string in the middle with an ellipsis.
 * @param {string} str - The string to truncate.
 * @param {number} [length=10] - The maximum length of the truncated string.
 * @returns {string} The truncated string.
 */
export const truncateMiddle = (str: string, length = 10) => {
  if (str.length <= length) {
    return str;
  }

  const left = str.slice(0, length / 2);
  const right = str.slice(-length / 2);

  return `${left}…${right}`;
};
