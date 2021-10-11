import envs from '../config/environment';
import HttpResponse from '../models/response.model';
import User from '../models/user.model';

const handleSignUp = async (user: User) => {
  const settings = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  };
  const response = await fetch(
    `${envs?.DEV_USER_SERVICE_URL}/user`,
    settings
  );
  const data: HttpResponse = await response.json();
  return data;
};
export default handleSignUp;
const handleSignIn = async () => {};
const handlesomeshit = async () => {};
