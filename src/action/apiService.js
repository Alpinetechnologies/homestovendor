import {
  ABORT_ERROR_MESSAGE,
  GET_REQUEST_TIMEOUT,
  constructFailureResponse,
  constructNetworkErrorResponse,
  NETWORK_REQUEST_FAILED,
  POST_REQUEST_TIMEOUT,
  constructGetRequestOptions,
  constructPostRequestOptions,
  RESPONSE_SUCCESS,
  constructPostRequestWithTokenOptions,
  RESPONSE_FAILURE,
  constructGetRequestWithTokenOptions,
} from './serviceUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const makeGetRequest = async url => {
  try {
    if (!url) {
      throw new Error('No URL');
    }
    //  console.log('make GET Final request = ' + url);
    let controller = new AbortController();
    setTimeout(() => controller.abort(), GET_REQUEST_TIMEOUT);
    const response = await fetch(
      url,
      {signal: controller.signal},
      constructGetRequestOptions(),
    );
    const json = await response.json();
    if (json) {
      //  console.log('http GET OK');

      if (
        json.success === RESPONSE_SUCCESS ||
        json.success === RESPONSE_FAILURE
      ) {
        return json;
      }
      return constructFailureResponse(json.msg);
    } else {
      return constructFailureResponse();
    }
  } catch (error) {
    //  console.log(error.message);
    if (
      error.message === ABORT_ERROR_MESSAGE ||
      error.message === NETWORK_REQUEST_FAILED
    ) {
      return constructNetworkErrorResponse();
    }
    return constructFailureResponse();
  }
};

export const makeGetRequestWithToken = async url => {
  try {
    if (!url) {
      throw new Error('No URL');
    }
    console.log('make GET Final request = ' + url);
    let token = await AsyncStorage.getItem('accessToken');
    console.log(token);
    let controller = new AbortController();
    setTimeout(() => controller.abort(), GET_REQUEST_TIMEOUT);
    const response = await fetch(
      url,
      constructGetRequestWithTokenOptions(token),
      {signal: controller.signal},
    );

    // console.log(response);
    const json = await response.json();

    // console.log(json);

    if (json) {
      if (
        json.success === RESPONSE_SUCCESS ||
        json.success === RESPONSE_FAILURE
      ) {
        return json;
      }
      return constructFailureResponse(json.msg);
    } else {
      return constructFailureResponse();
    }
  } catch (error) {
    if (
      error.message === ABORT_ERROR_MESSAGE ||
      error.message === NETWORK_REQUEST_FAILED
    ) {
      return constructNetworkErrorResponse();
    }
    return constructFailureResponse();
  }
};

export const makePostRequest = async (url, payload) => {
  try {
    // console.log('make POST request FINAL= ' + url);
    let controller = new AbortController();
    setTimeout(() => controller.abort(), POST_REQUEST_TIMEOUT);
    const response = await fetch(url, constructPostRequestOptions(payload), {
      signal: controller.signal,
    });

    const json = await response.json();
    // console.log(json);

    if (
      json.success === RESPONSE_SUCCESS ||
      json.success === RESPONSE_FAILURE
    ) {
      return json;
    }
    return constructFailureResponse(json.msg);
  } catch (error) {
    if (
      error.message === ABORT_ERROR_MESSAGE ||
      error.message === NETWORK_REQUEST_FAILED
    ) {
      return constructNetworkErrorResponse();
    }
    return constructFailureResponse();
  }
};

export const makePostRequestWithToken = async (url, payload) => {
  try {
    //  console.log('make POST Header Token request FINAL= ' + url);
    let token = await AsyncStorage.getItem('accessToken');
    let controller = new AbortController();
    setTimeout(() => controller.abort(), POST_REQUEST_TIMEOUT);
    const response = await fetch(
      url,
      constructPostRequestWithTokenOptions(payload, token),
      {
        signal: controller.signal,
      },
    );
    const json = await response.json();

    if (
      json.success === RESPONSE_SUCCESS ||
      json.success === RESPONSE_FAILURE
    ) {
      return json;
    }
    return constructFailureResponse(json.msg);
  } catch (error) {
    if (
      error.message === ABORT_ERROR_MESSAGE ||
      error.message === NETWORK_REQUEST_FAILED
    ) {
      return constructNetworkErrorResponse();
    }
    return constructFailureResponse();
  }
};
