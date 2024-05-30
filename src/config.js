const BASE_URL = 'http://localhost:8080';
const CLIENT_URL = 'http://localhost:3000';
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
  JOIN: `${BASE_URL}/events/join`,
  REFUSE: `${BASE_URL}/events/refuse`,
  USERS_ON_SHIFT: `${BASE_URL}/events/users?shift`,
  EVENT_USERS_PDF: `${BASE_URL}/events/users/pdf`,
  USER_EVENTS_CURRENT: `${BASE_URL}/users/shifts/current`,
  USER_EVENTS_PAST: `${BASE_URL}/users/shifts/past`,
  ORGANISATIONS_EVENTS_CURRENT: `${BASE_URL}/organisations/events/current`,
  ORGANISATIONS_EVENTS_PAST: `${BASE_URL}/organisations/events/past`,
  DETAILS: `${CLIENT_URL}/details`,

  ORGANISATIONS_ADMIN: `${BASE_URL}/organisations/admin/all`,
  DISTRICTS_ADMIN: `${BASE_URL}/districts/admin/all`,
  CITIES_ADMIN: `${BASE_URL}/cities/admin/all`,

  ADD_ORGANISATION: `${BASE_URL}/organisations/add`,
  ADD_CITIES: `${BASE_URL}/cities/add`,
  ADD_DISTRICTS: `${BASE_URL}/districts/add`,
  ADD_CATEGORIES: `${BASE_URL}/categories/add`,

  DELETE_USER: `${BASE_URL}/users/delete`,
  DELETE_ORGANISATION: `${BASE_URL}/organisations/disapprove`,

  DELETE_EVENT: `${BASE_URL}/events/admin/delete`,
  DELETE_CATEGORY: `${BASE_URL}/categories/delete`,
  DELETE_DISTRICT: `${BASE_URL}/districts/delete`,
  DELETE_CITY: `${BASE_URL}/cities/delete`,

  
  USERS_WITH_NO_ROLES: `${BASE_URL}/users/volunteers`,
  THEY_NEED_YOU: `${BASE_URL}/events/need`,

  PUBLIC_RAPORT: `${BASE_URL}/reports/public`,

  LOGIN: LOGIN_URL,
  ORGANISATION_EDIT: `${BASE_URL}/organisations/edit`,

  REPORTS: `${BASE_URL}/reports/all`,
  ADD_REPORT: `${BASE_URL}/reports/add`,
  EDIT_REPORT: `${BASE_URL}/reports/edit`,
  PUBLISH_REPORT: `${BASE_URL}/reports/publish`,
  UNPUBLISH_REPORT: `${BASE_URL}/reports/unpublish`,
  DELETE_REPORT: `${BASE_URL}/reports/delete`,

  FAQ: `${BASE_URL}/faq`,
  DELETE_FAQ: `${BASE_URL}/faq/delete`
};

module.exports = { URLS, BASE_URL };
