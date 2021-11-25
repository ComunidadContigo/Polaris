import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpResponse from '../models/response.model';
import envs from '../config/environment';

// export const isTokenValid = (token: string): boolean => !!token;

export const getAccessToken = async (loginResponse: {}): Promise<
  string | undefined
> => {
  const settings = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(loginResponse),
  };
  try {
    const response = await fetch(
      `${envs?.DEV_AUTH_SERVICE_URL}/token`,
      settings,
    );
    const res: HttpResponse = await response.json();
    if (res.success) {
      // TODO: Store token in local storage
      return res?.data;
      // TODO: Change authContext
    }
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@storage_refreshToken', token);
  } catch (e) {
    console.log('There was an error while saving the token...', e);
  }
};

export const getToken = async (): Promise<string | undefined> => {
  try {
    const token = await AsyncStorage.getItem('@storage_refreshToken');
    if (token !== null) {
      // value previously stored
      console.log('TOKEN FROM LOCAL STORAGE: ', token);
      return token;
    }
  } catch (e) {
    console.log('Error getting the token from local storage...', e);
  }
  return undefined;
};
