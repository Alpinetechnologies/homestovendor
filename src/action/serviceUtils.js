import AlertMsg from '../components/alert-msg';

export const GET_REQUEST_TIMEOUT = 20000;
export const POST_REQUEST_TIMEOUT = 20000;

export const RESPONSE_SUCCESS = 'true';
export const RESPONSE_FAILURE = 'false';
export const RESPONSE_INVALID_SELLER = 2;
export const RESPONSE_NETWORK_ERROR = -1;
export const ABORT_ERROR_MESSAGE = 'Aborted';
export const NETWORK_REQUEST_FAILED = 'Network request failed';

const REQUEST_METHOD_GET = 'GET';
const REQUEST_METHOD_POST = 'POST';
const REQUEST_HEADER_JSON = 'application/json';
const REQUEST_HEADER_CONTENT_KEY = 'Content-Type';

export const constructGetRequestOptions = () => {
  var requestHeaders = new Headers();
  requestHeaders.append(REQUEST_HEADER_CONTENT_KEY, REQUEST_HEADER_JSON);
  return {
    method: REQUEST_METHOD_GET,
    headers: requestHeaders,
  };
};

export const constructGetRequestWithTokenOptions = token => {
  var requestHeaders = new Headers();
  requestHeaders.append(REQUEST_HEADER_CONTENT_KEY, REQUEST_HEADER_JSON);
  requestHeaders.append('Authorization', token);

  return {
    method: REQUEST_METHOD_GET,
    headers: requestHeaders,
  };
};

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

export const constructPostRequestOptions = payload => {
  var requestHeaders = new Headers();
  //requestHeaders.append(REQUEST_HEADER_CONTENT_KEY, REQUEST_HEADER_JSON);
  const formdata = getFormData(payload);

  return {
    method: REQUEST_METHOD_POST,
    headers: requestHeaders,
    body: formdata,
  };
};

export const constructPostRequestWithTokenOptions = (payload, token) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  const formdata = getFormData(payload);

  return {
    method: REQUEST_METHOD_POST,
    headers: myHeaders,
    body: formdata,
  };
};

export const constructSuccessResponse = payload => {
  return {
    status: RESPONSE_SUCCESS,
    data: payload,
  };
};

export const constructFailureResponse = (message = '') => {
  return {
    status: RESPONSE_FAILURE,
    message: message ? message : 'Something went wrong! Try again Later ..',
  };
};

export const constructNetworkErrorResponse = () => {
  AlertMsg('Please check your Internet Connection');
  return {
    status: RESPONSE_NETWORK_ERROR,
    message: 'No Network Found !',
  };
};
