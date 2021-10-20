import envs from '../config/environment';
import HttpResponse from '../models/response.model';
import User from '../models/user.model';

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

  const response = await fetch('http://10.0.2.2:3003/user', settings);

  const data: HttpResponse = await response.json();
  console.log(data);
  return data;
};

const handleSignIn = async (email: any) => {
  const response = await fetch(
    `${envs?.DEV_USER_SERVICE_URL}/user/${email}`,
  );
  const data = await response.json();
  return data;
};
export default { handleSignIn, handleSignUp };
// eslint-disable-next-line no-unused-vars
const handleUpdateUser = async () => {};
