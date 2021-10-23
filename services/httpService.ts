import envs from '../config/environment';
import HttpResponse from '../models/response.model';
import User from '../models/user.model';
import Login from '../models/login.model';
import { storeToken } from './tokenService';

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

const handleSignIn = async (login: Login) => {
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
    console.log('RESPONSE', res);
    console.log('TOKEN:', res?.data?.token);
    if (res.success) {
      // TODO: Store token in local storage
      storeToken(res?.data?.token);
      // TODO: Change authContext
    }
  } catch (e) {
    console.log(e);
  }
  // const data: HttpResponse = await response.json();

  // console.log(response);
  // console.log(data);
};
export default { handleSignIn, handleSignUp };
// eslint-disable-next-line no-unused-vars
const handleUpdateUser = async () => {};
