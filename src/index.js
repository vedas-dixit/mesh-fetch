// src/index.js
const debounce = require("./utils/debounce");
const throttle = require("./utils/throttle");
const fetchAPI = require("./utils/fetchApi");
const formatResponse = require("./utils/responseFormat");

module.exports = {
  fetchAPI,
  debounce,
  throttle,
  formatResponse,
};