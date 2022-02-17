const axios = require('axios');

const api = (server) => axios.create({
  baseURL: `https://mcapi.us/server/status?${server}`,
  timeout: 2000
});

module.exports = api;