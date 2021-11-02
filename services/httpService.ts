/* eslint-disable prefer-template */
import envs from '../config/environment';
import HttpResponse from '../models/response.model';
import User from '../models/user.model';
import { getAccessToken, getToken } from './tokenService';

interface requestSettings {
  headers: {};
  method: string;
  body: string;
}

// let accessToken: string | undefined;

export const siriusFetch = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
  endpoint: string | Request,
  settings?: requestSettings | undefined,
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
        setAccessToken(
          await getAccessToken({
            u_id: uid,
            token: await getToken(),
          }),
        );
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

// export const getUserById = async (id: number): Promise<{} | undefined> =>
//   // eslint-disable-next-line implicit-arrow-linebreak
//   siriusFetch(`${envs?.DEV_USER_SERVICE_URL}/${id}`);
