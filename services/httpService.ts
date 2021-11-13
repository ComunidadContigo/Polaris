/* eslint-disable prefer-template */
import envs from '../config/environment';
import HttpResponse from '../models/response.model';
import User from '../models/user.model';
import { getAccessToken, getToken, storeToken } from './tokenService';
import { RequestSettings } from '../models/request.model';
import Login from '../models/login.model';

// let accessToken: string | undefined;

export const siriusFetch = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
  endpoint: string | Request,
  settings?: RequestSettings | undefined,
): Promise<HttpResponse | void> => {
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
  }
  let data: HttpResponse;
  try {
    console.log('SENDING: ', endpoint, {
      method,
      headers,
      body,
    });
    const res = await fetch(endpoint, {
      method,
      headers,
      body,
    });
    data = await res.json();
    if (res.status) {
      // console.log(data);

      if (data?.errors[0] === 'jwt expired') {
        // Handle expired token.
        const newAccessToken = await getAccessToken({
          u_id: uid,
          token: await getToken(),
        });
        setAccessToken(newAccessToken);
        siriusFetch(
          newAccessToken,
          setAccessToken,
          uid,
          endpoint,
          settings,
        );
        console.log('Refreshed access token and resent request.');
      }
    }
    return data;
  } catch (e) {
    console.log(e);
  }
  return Promise.resolve();
};

export const handleSignUp = async (user: User) => {
  const settings = {
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  };
  try {
    const response = await fetch(
      `${envs?.DEV_USER_SERVICE_URL}`,
      settings,
    );
    const data: HttpResponse = await response.json();
    if (!data.success) {
      throw data.errors;
    }
    return data;
  } catch (e) {
    console.log([e, 'Error creating the user.']);
  }
  return null;
};

export const handleSignIn = async (
  accessToken: string | undefined,
  setAccessToken: any,
  setUid: any,
  login: Login,
): Promise<string | undefined> => {
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
    if (res.success) {
      // Store refresh token in local storage
      storeToken(res?.data?.token);
      // Set uid in context for use during access token refresh
      setUid(res?.data?.u_id);
      // Get access token from the refresh token
      try {
        setAccessToken(await getAccessToken(res?.data));
      } catch (e) {
        console.log([e, 'Error setting access token.']);
      }
    } else {
      setAccessToken('');
      console.log(res.errors);
    }
  } catch (e) {
    console.log(e);
  }
  return accessToken;
  // const data: HttpResponse = await response.json();

  // console.log(response);
  // console.log(data);
};

// export const getUserById = async (id: number): Promise<{} | undefined> =>
//   // eslint-disable-next-line implicit-arrow-linebreak
//   siriusFetch(`${envs?.DEV_USER_SERVICE_URL}/${id}`);
