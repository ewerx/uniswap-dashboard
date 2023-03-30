import {
  formatCurrency,
  formatPercent,
  formatTokenAmount,
  formatTimestamp,
  truncateMiddle,
} from "../format";

describe("formatting", () => {
  describe("formatCurrency", () => {
    it("formats currency with compact notation", () => {
      expect(formatCurrency(5000)).toBe("$5.0K");
      expect(formatCurrency(12000)).toBe("$12.0K");
    });

    it("formats currency with decimal points", () => {
      expect(formatCurrency(500.123)).toBe("$500.12");
      expect(formatCurrency(999)).toBe("$999.00");
    });
  });

  describe("formatPercent", () => {
    it("formats percentage with one decimal", () => {
      expect(formatPercent(0.12345)).toBe("12.3%");
      expect(formatPercent(0.98765)).toBe("98.8%");
    });
  });

  describe("formatTokenAmount", () => {
    it("formats token amount with compact notation", () => {
      expect(formatTokenAmount(BigInt(5000))).toBe("5K");
      expect(formatTokenAmount(BigInt(12000))).toBe("12K");
    });
  });

  describe("formatTimestamp", () => {
    it("formats timestamp as relative time", () => {
      const now = new Date();
      const secondsAgo = new Date(now.getTime() - 25 * 1000);
      const minutesAgo = new Date(now.getTime() - 25 * 60 * 1000);
      const hoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);
      const daysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

      expect(formatTimestamp(secondsAgo)).toMatch(/\d{1,2}s ago/);
      expect(formatTimestamp(minutesAgo)).toMatch(/\d{1,2}m ago/);
      expect(formatTimestamp(hoursAgo)).toMatch(/\d{1,2}h ago/);
      expect(formatTimestamp(daysAgo)).toMatch(/\d{1,2}d ago/);
    });
  });

  describe("truncateMiddle", () => {
    it("truncates middle part of a string", () => {
      expect(truncateMiddle("abcdefghijklm")).toBe("abcde…ijklm");
      expect(truncateMiddle("1234567890abcdef", 8)).toBe("1234…cdef");
    });

    it("returns the original string when length is equal or greater", () => {
      expect(truncateMiddle("abcdef", 6)).toBe("abcdef");
      expect(truncateMiddle("abcdef", 10)).toBe("abcdef");
    });
  });
});
