const BASE_URL = 'http://localhost:8080';
const LOGIN_URL = 'http://localhost:3000/login';

const URLS = {
  EVENTS: `${BASE_URL}/events`,
  CATEGORIES: `${BASE_URL}/categories`,
  DISTRICTS: `${BASE_URL}/districts`,
  CITIES: `${BASE_URL}/cities`,
  ORGANISATIONS: `${BASE_URL}/organisations`,
  USERS: `${BASE_URL}/users`,

  AUTHENTICATE: `${BASE_URL}/auth/authenticate`,
  REGISTER: `${BASE_URL}/auth/register`,
  USER: `${BASE_URL}/auth/current`,
  LOGIN: LOGIN_URL,

  JOIN: `${BASE_URL}/events/join`,
  REFUSE: `${BASE_URL}/events/refuse`,
  USERS_ON_SHIFT: `${BASE_URL}/events/users?shift`,
  EVENT_USERS_PDF: `${BASE_URL}/events/users/pdf`,
  ADD_ORGANISATION: `${BASE_URL}/organisations/add`,
};

module.exports = { URLS, BASE_URL };