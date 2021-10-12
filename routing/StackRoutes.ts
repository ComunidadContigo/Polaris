/* eslint-disable no-unused-vars */
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// eslint-disable-next-line no-shadow
export enum MainRoutes {
  Greeting = 'Greeting',
  SignUp = 'SignUp',
  LogIn = 'LogIn',
  Home = 'Home',
}

export type MainStackParamList = {
  [MainRoutes.Greeting]: undefined;
  [MainRoutes.SignUp]: undefined;
  [MainRoutes.LogIn]: undefined;
  [MainRoutes.Home]: undefined;
};

export const MainStack = createNativeStackNavigator<MainStackParamList>();
