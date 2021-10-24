/* eslint-disable prefer-template */
import envs from '../config/environment';
import HttpResponse from '../models/response.model';
import User from '../models/user.model';
import Login from '../models/login.model';
import { storeToken, getAccessToken } from './tokenService';

interface requestSettings {
  headers: {};
  method: string;
  body: string;
}

let accessToken: string | undefined;

export const siriusFetch = async (
  endpoint: string | Request,
  settings?: requestSettings | undefined,
): Promise<HttpResponse> => {
  console.log('-------- GOT TO SIRIUS FETCH -------');
  let headers;
  let method;
  let body;
  if (!settings) {
    // It is a GET request to the endpoint
    headers = {
      // eslint-disable-next-line quote-props
      Authorization: 'Bearer ' + accessToken,
    };
    method = 'get';
  } else {
    headers = {
      ...settings.headers,
      Authorization: 'Bearer ' + accessToken,
    };
    method = settings.method;
    body = settings.body;
    console.log('POST REQUEST PARAMETERS: ', endpoint, {
      method,
      headers,
      body,
    });
  }

  // Try fetch
  // If get jwt token expired error, get new access token
  // re-make fetch
  // fetch(url, settings);
  let data: HttpResponse;
  try {
    const res = await fetch(endpoint, {
      method,
      headers,
      body,
    });
    data = await res.json();
    if (res.status) {
      console.log(data);
      return data;
    }
    if (data?.errors[0] === 'jwt expired') {
      // Handle expired token.
      console.log('WOOPS, EXPIRED...');
      return data;
    }
  } catch (e) {
    console.log(e);
  }
  return data;
};

const handleSignUp = async (user: User) => {
  const settings = {
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  };
  const response = await fetch(
    `${envs?.DEV_USER_SERVICE_URL}/user`,
    settings,
  );
  const data: HttpResponse = await response.json();
  return data;
};

const handleSignIn = async (login: Login): Promise<string | undefined> => {
  const settings = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(login),
  };
  try {
    const response = await fetch(
      `${envs?.DEV_AUTH_SERVICE_URL}/login`,
      settings,
    );
    const res: HttpResponse = await response.json();
    console.log('DATA:', res?.data);
    if (res.success) {
      // Store refresh token in local storage
      storeToken(res?.data?.token);
      // Get access token from the refresh token
      accessToken = await getAccessToken(res?.data);
      // getUserById(1);
      // TODO: Change authContext
    } else {
      accessToken = '';
    }
  } catch (e) {
    console.log(e);
  }
  return accessToken;
  // const data: HttpResponse = await response.json();

  // console.log(response);
  // console.log(data);
};

const getUserById = async (id: number): Promise<{} | undefined> => {
  siriusFetch(`${envs?.DEV_USER_SERVICE_URL}/${id}`);
  return {};
};

export default { handleSignIn, handleSignUp };
// eslint-disable-next-line no-unused-vars
const handleUpdateUser = async () => {};
