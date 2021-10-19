import envs from '../config/environment';
import HttpResponse from '../models/response.model';
import User from '../models/user.model';
import Login from '../models/login.model';

const handleSignUp = async (user: User) => {
  console.log(user);
  const settings = {
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  };
  console.log(settings.body);
  const response = await fetch('http://10.0.2.2:3003/user', settings);

  const data: HttpResponse = await response.json();
  console.log(data);
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
  console.log('body...');
  console.log(settings.body);
  const response = await fetch('http://10.0.2.2:3001/login', settings);

  const data: HttpResponse = await response.json();
  console.log('Data');
  console.log(response);
  // console.log(data.errors);
  return data;
};
export default { handleSignIn, handleSignUp };
// eslint-disable-next-line no-unused-vars
const handleUpdateUser = async () => {};
