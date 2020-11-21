import { ClientFunction, RequestLogger } from 'testcafe';

export const getPageUrl = ClientFunction(() => document.location.href);

export const getNavigatorLanguage = ClientFunction(() => window.navigator.language);

// GET requests
export const logger = RequestLogger({ url: 'https://www.didomi.io', method: 'GET' });

// log POST requests sent to api.privacy  with "type" : "consent.given"
export const postConsentLogger = RequestLogger((request) => (
  request.url === 'https://api.privacy-center.org/v1/events'
  && request.method === 'post'
  && request.body.toString().indexOf('"type" : "consent.given"') !== -1), {
  logRequestHeaders: true,
  logRequestBody: true,
  stringifyRequestBody: true,
  logResponseHeaders: true,
  logResponseBody: true,
  stringifyResponseBody: true,
});

// log POST requests sent to api.privacy  with "type" : "pageview"
export const postDenyLogger = RequestLogger((request) => (
  request.url === 'https://api.privacy-center.org/v1/events'
  && request.method === 'post'
  && request.body.toString().indexOf('"type" : "pageview"') !== -1), {
  logRequestHeaders: true,
  logRequestBody: true,
  stringifyRequestBody: true,
  logResponseHeaders: true,
  logResponseBody: true,
  stringifyResponseBody: true,
});

export const getAllCookies = ClientFunction(() => document.cookie);

export async function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  const cookieArr = await getAllCookies();
  // Loop through the array elements
  for (let i = 0; i < cookieArr.length; i += 1) {
    const cookiePair = cookieArr[i].split('=');
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

export async function deleteCookie(cookieName) {
  // Deleting a cookie max-age=0
  document.cookie = `${cookieName}=; max-age=0`;
}

export async function checkCookie(cookieName, consentType) {
  // Get cookie using our custom function
  const cookie = getCookie(cookieName);
  // Check conservation date should be <= 13 months
  switch (consentType) {
    case 'consent.givent':
      return (cookie.purposes.disabled.length === 0 && cookie.vendors.disabled.length === 0);
    case 'page.view':
      return (cookie.purposes.enabled.length === 0 && cookie.vendors.enabled.length === 0);
    default:
      return false;
  }
}

module.exports = {
  logger,
  postConsentLogger,
  postDenyLogger,
  getPageUrl,
  getNavigatorLanguage,
  getAllCookies,
  getCookie,
  deleteCookie,
  checkCookie,
};
