const BASE_URL = 'http://localhost:8080';
const LOGIN_URL = 'http://localhost:3000/login';

const URLS = {
  EVENTS: `${BASE_URL}/events`,
  CATEGORIES: `${BASE_URL}/categories`,
  DISTRICTS: `${BASE_URL}/districts`,
  ORGANISATIONS: `${BASE_URL}/organisations`,
  AUTHENTICATE: `${BASE_URL}/auth/authenticate`,
  REGISTER: `${BASE_URL}/auth/register`,
  USER: `${BASE_URL}/auth/current`,
  LOGIN: LOGIN_URL,
};

module.exports = { URLS, BASE_URL };