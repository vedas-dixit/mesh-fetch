const { formatResponse } = require("../src");

describe("formatResponse function", () => {
  test("should return data as an object", () => {
    const data = { name: "Vedas" };
    const formatted = formatResponse(data, "object");
    expect(formatted).toEqual({ name: "Vedas" });
  });

  test("should return data as an array", () => {
    const data = { name: "Vedas" };
    const formatted = formatResponse(data, "array");
    expect(formatted).toEqual([{ name: "Vedas" }]);
  });
});
