const { fetchAPI } = require("../src");


describe("fetchAPI function", () => {
  test("should fetch data successfully from an API", async () => {
    const data = await fetchAPI("https://jsonplaceholder.typicode.com/todos/1");
    expect(data).toHaveProperty("id", 1);
  });

  test("should return an error message for an invalid URL", async () => {
    const data = await fetchAPI("https://invalidurl.com");
    expect(data).toHaveProperty("success", false);
  });
});
