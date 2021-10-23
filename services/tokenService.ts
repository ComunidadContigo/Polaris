import AsyncStorage from '@react-native-async-storage/async-storage';

export const isTokenValid = (token: string): boolean => !!token;

export const getNewAccessToken = (): string => 'NEW ACCESS TOKEN';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('@storage_Token', token);
  } catch (e) {
    console.log('There was an error while saving the token...', e);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@storage_Token');
    if (token !== null) {
      // value previously stored
      console.log('TOKEN FROM LOCAL STORAGE: ', token);
    }
  } catch (e) {
    // error reading value
  }
};
