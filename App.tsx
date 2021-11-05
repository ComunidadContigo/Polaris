import { Platform } from 'react-native';
import Constants from 'expo-constants';
import React, { useEffect, useRef, useState } from 'react';

import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './components/context';

// Screens

import SignInScreen from './screens/SignInScreen/SignInScreen';
import GreetingScreen from './screens/GreetingScreen/GreetingScreen';

import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import EditProfileScreen from './screens/ProfileScreens/EditProfileScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';

// Routes
import { MainRoutes } from './routing/StackRoutes';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [accessToken, setAccessToken] = useState('');
  const [uid, setUid] = useState('');

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((n) => setNotification(n));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((n) => {
        setNotification(n);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!,
      );
      Notifications.removeNotificationSubscription(
        responseListener.current!,
      );
    };
  }, []);

  // const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, uid, setUid }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!accessToken ? (
            <>
              <Stack.Screen
                name={MainRoutes.Greeting}
                component={GreetingScreen}
              />
              <Stack.Screen
                name={MainRoutes.LogIn}
                component={SignInScreen}
              />
              <Stack.Screen
                name={MainRoutes.SignUp}
                component={SignUpScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={MainRoutes.Home}
                component={HomeScreen}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const registerForPushNotificationsAsync = async (): Promise<string> => {
  let token: string;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return '';
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token!;
};
