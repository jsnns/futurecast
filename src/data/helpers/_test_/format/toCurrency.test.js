import { toCurrency } from "../../format";

test("it formats a currency with two decimals", () => {
  expect(toCurrency(-7250.7005)).toBe("$7.25k");
});