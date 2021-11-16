import React, { useEffect, useRef, useState } from 'react';

import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './components/context';
import { registerForPushNotificationsAsync } from './services/localNotificationService';

// Screens
import GreetingScreen from './screens/GreetingScreen/GreetingScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import EditProfileScreen from './screens/ProfileScreens/EditProfileScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';

// Routes
import { MainRoutes } from './routing/StackRoutes';
import RequestModal from './components/RequestModal';

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

  const [showRequestModal, setShowRequestModal] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const handleShowModal = () => {
    setShowRequestModal(!showRequestModal);
  };

  useEffect(() => {
    if (accessToken) {
      registerForPushNotificationsAsync(
        accessToken,
        setAccessToken,
        uid,
      ).then((token) => setExpoPushToken(token));

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current =
        Notifications.addNotificationReceivedListener((n) => {
          console.log('got notif');
          setNotification(n);
          setShowRequestModal(true);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener(
          (response) => {
            console.log('received response to notif');
            console.log(response);
            setShowRequestModal(true);
          },
        );

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current!,
        );
        Notifications.removeNotificationSubscription(
          responseListener.current!,
        );
      };
    }
    return undefined;
  }, [accessToken]);

  // const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, uid, setUid }}
    >
      <RequestModal
        visible={showRequestModal}
        handleShowModal={handleShowModal}
        animationType="slide"
        transparent
        notification={notification}
      />
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
