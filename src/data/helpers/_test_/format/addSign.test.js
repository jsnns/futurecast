import { addSign } from "../../format";

test("appends a dollar sign", () => {
  const curr = addSign(1000);
  expect(curr).toBe("$1000");
});