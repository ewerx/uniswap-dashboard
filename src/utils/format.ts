export const formatCurrency = (amount: number, currency = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: amount < 1000 ? 2 : 1,
  });

  return formatter.format(amount);
};

export const formatPercent = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return formatter.format(amount);
};

export const formatTokenAmount = (amount: bigint) => {
  const absAmount = amount < 0 ? -amount : amount;
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
  });

  return formatter.format(absAmount);
};

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

export const truncateMiddle = (str: string, length = 10) => {
  if (str.length <= length) {
    return str;
  }

  const left = str.slice(0, length / 2);
  const right = str.slice(-length / 2);

  return `${left}…${right}`;
};
