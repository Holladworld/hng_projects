module.exports = {
  CAT_FACT_API: {
    URL: 'https://catfact.ninja/fact',
    TIMEOUT: 5000
  },
  HTTP_STATUS: {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
  },
  RESPONSE_MESSAGES: {
    SUCCESS: 'success',
    ERROR: 'error',
    CAT_FACT_UNAVAILABLE: 'Unable to fetch cat fact at this time',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable'
  }
};