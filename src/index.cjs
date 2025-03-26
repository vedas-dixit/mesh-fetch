const debounce = require("./utils/debounce.cjs");
const throttle = require("./utils/throttle.cjs");
const fetchAPI = require("./utils/fetchApi.cjs");
const formatResponse = require("./utils/responseFormat.cjs");

module.exports = {
  fetchAPI,
  debounce,
  throttle,
  formatResponse,
};