const defaultServerUrl = __MOCK_API_IS_USE__ ? `${__MOCK_API_HOST__}:${__MOCK_API_PORT__}` : __SERVER_URL__;
const serverUrl = __IS_STATIC_SERVER_HOST__ ? defaultServerUrl : window.location.origin;

const API_PATH_HASH = {
  serverUrl,
  version: `${serverUrl}/myapi/version`,
  countries: `${serverUrl}/myapi/countries`,
  auth: `${serverUrl}/myapi/auth`,
  server: `${serverUrl}`,
  profileMe: `${serverUrl}/myapi/me`,
};

export default API_PATH_HASH;
