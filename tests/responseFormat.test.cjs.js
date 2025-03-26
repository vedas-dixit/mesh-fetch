const formatResponse = require("../src/utils/responseFormat.cjs.js");

describe("formatResponse function", () => {
  test("should return data as an object", () => {
    const data = { name: "Kurama" };
    const formatted = formatResponse(data, "object");
    expect(formatted).toEqual({ name: "Kurama" });
  });

  test("should return data as an array", () => {
    const data = { name: "Kurama" };
    const formatted = formatResponse(data, "array");
    expect(formatted).toEqual([{ name: "Kurama" }]);
  });
});
