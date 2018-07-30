const genericErrors = {
  GENERIC_ERROR: {
    status: 500,
    errorCode: 0,
    message: 'GENERIC_ERROR',
  },
  DATA_NOT_FOUND: {
    status: 500,
    errorCode: 1,
    message: 'DATA_NOT_FOUND',
  },
  UNAUTHORIZED_ACCESS: {
    status: 403,
    errorCode: 403,
    message: 'UNAUTHORIZED_ACCESS',
  },
  ACCOUNT_NOT_LOGIN: {
    status: 401,
    errorCode: 401,
    message: 'ACCOUNT_NOT_LOGIN',
  },
  INVALID_PARAM: {
    status: 400,
    errorCode: 4,
    message: 'INVALID_PARAM',
  },
  MEMBER_NOT_FOUND: {
    status: 439,
    errorCode: 5,
    message: 'MEMBER_NOT_FOUND',
  },
  PROCESS_FAIL: {
    status: 422,
    errorCode: 6,
    message: 'PROCESS_FAIL',
  },
  INVALID_ACCOUNT: {
    status: 401,
    errorCode: 7,
    message: 'INVALID_ACCOUNT',
  },
  INVALID_PASSWORD: {
    status: 401,
    errorCode: 8,
    message: 'INVALID_PASSWORD',
  },
  ACCOUNT_NOT_ACTIVED: {
    status: 401,
    errorCode: 9,
    message: 'ACCOUNT_NOT_ACTIVED',
  },
  ACCOUNT_EXISTS: {
    status: 422,
    errorCode: 10,
    message: 'ACCOUNT_EXISTS',
  },
  COMPANY_NOT_FOUND: {
    status: 439,
    errorCode: 11,
    message: 'COMPANY_NOT_FOUND',
  },
  ACCOUNT_ALREADY_ACTIVE: {
    status: 304,
    errorCode: 12,
    message: 'ACCOUNT_ALREADY_ACTIVE',
  },
  SOCIALPROFILE_NOT_FOUND: {
    status: 439,
    errorCode: 13,
    message: 'SOCIALPROFILE_NOT_FOUND',
  },
  PAGE_NOT_FOUND: {
    status: 404,
    errorCode: 404,
    message: 'PAGE_NOT_FOUND',
  },
};

const styleMeErrors = {
  INVALID_COOKIE_ID: {
    status: 400,
    errorCode: 1000,
    message: 'INVALID_COOKIE_ID',
  },
  INVALID_AVATAR_DATA: {
    status: 400,
    errorCode: 1001,
    message: 'INVALID_AVATAR_DATA',
  },
  INVALID_EMAIL_ADDREASS: {
    status: 400,
    errorCode: 1005,
    message: 'INVALID_EMAIL_ADDREASS',
  },
};

const storageKeyErrors = {
  INVALID_ID_VALUE: {
    status: 400,
    errorCode: 1002,
    message: 'INVALID_ID_VALUE',
  },
  INVALID_ID_FORMAT: {
    status: 400,
    errorCode: 1003,
    message: 'INVALID_ID_FORMAT',
  },
  INVALID_EMAIL_ADDRESS: {
    status: 400,
    errorCode: 1005,
    message: 'INVALID_EMAIL_ADDRESS',
  },
};

const layeringErrors = {
  INVALID_OBJECT_ID: {
    status: 400,
    errorCode: 3000,
    message: 'INVALID_OBJECT_ID',
  },
  INVALID_LAYERING_ORDER: {
    status: 400,
    errorCode: 3001,
    message: 'INVALID_LAYERING_ORDER',
  },
  OUTPUT_NOT_FOUND: {
    status: 439,
    errorCode: 3002,
    message: 'OUTPUT_NOT_FOUND',
  },
  LAYERING_LOAD_DLL_FAIL: {
    status: 422,
    errorCode: 3003,
    message: 'LAYERING_LOAD_DLL_FAIL',
  },
  LAYERING_NO_ZIP: {
    status: 439,
    errorCode: 3004,
    message: 'LAYERING_NO_ZIP',
  },
  RENDERING_SERVER_NOT_FOUND: {
    status: 439,
    errorCode: 3005,
    message: 'RENDERING_SERVER_NOT_FOUND',
  },
  RESPONSE_TIME_OUT: {
    status: 422,
    errorCode: 3006,
    message: 'RESPONSE_TIME_OUT',
  },
  TEMPLATE_BODY_NOT_FOUND: {
    status: 439,
    errorCode: 3007,
    message: 'TEMPLATE_BODY_NOT_FOUND',
  },
};

export const DEFAULT_ERR_MSG_HASH = Object.assign({}, genericErrors, styleMeErrors, storageKeyErrors, layeringErrors);

export const DEFAULT_ERR_EXCEPTION_MSG_HASH = {
  UNKNOWN: {
    status: false,
    errorCode: '',
    message: 'UNKNOWN_ERROR',
  },
  DISCONNECTED: {
    status: false,
    errorCode: '',
    message: 'DISCONNECTED',
  },
  TIMEOUT: {
    status: false,
    errorCode: '',
    message: 'TIMEOUT',
  },
};

export const DEFAULT_ERR_HTTP_STATUS_MSG_HASH = {
  304: {
    status: 304,
    errorCode: '',
    message: 'ACCOUNT_ALREADY_ACTIVE',
  },
  400: {
    status: 400,
    errorCode: '',
    message: 'INVALID_PARAM',
  },
  401: {
    status: 401,
    errorCode: '',
    message: 'ACCOUNT_NOT_LOGIN',
  },
  403: {
    status: 403,
    errorCode: '',
    message: 'UNAUTHORIZED_ACCESS',
  },
  404: {
    status: 404,
    errorCode: '',
    message: 'PAGE_NOT_FOUND',
  },
  500: {
    status: 500,
    errorCode: '',
    message: 'GENERIC_ERROR',
  },
};
