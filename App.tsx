import React, { useEffect, useRef, useState } from 'react';

import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { AuthContext, NotificationContext } from './components/context';
import { registerForPushNotificationsAsync } from './services/localNotificationService';

// Screens
import GreetingScreen from './screens/GreetingScreen/GreetingScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import EditProfileScreen from './screens/ProfileScreens/EditProfileScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import RequestDetailsScreen from './screens/RequestDetailsScreen/RequestDetailsScreen';

// Routes
import { MainRoutes } from './routing/StackRoutes';

import RequestModal from './components/RequestModal';
import { getRequestInfo } from './services/Buddy';
import { ReqModel } from './models/request.model';
import { getUserFromRid } from './services/User';
import { NotificationData } from './models/Notification.model';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [accessToken, setAccessToken] = useState('');
  const [uid, setUid] = useState<number>(-1);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  // These next 3 states compose the Notification Context Store
  const [requestData, setRequestData] = useState<ReqModel | undefined>(
    undefined,
  );
  const [activeRequestId, setActiveRequestId] = useState<number>(-1);
  const [notificationContext, setNotificationContext] =
    useState<NotificationData>();

  const handleShowModal = () => {
    setShowRequestModal(!showRequestModal);
  };

  const setupNotificationContext = async (
    n: Notifications.Notification,
  ) => {
    if (n) {
      const requesterInfo = await getUserFromRid(
        accessToken,
        setAccessToken,
        uid,
        (n.request.content.data.request as ReqModel).r_id,
      );
      setNotificationContext({ requesterInfo });
    }
  };

  async function updateActiveRequest() {
    const updatedRequest = await getRequestInfo(
      accessToken,
      setAccessToken,
      uid,
      activeRequestId,
    );
    setRequestData(updatedRequest);
    console.log(updatedRequest);
    if (updatedRequest?.stat === 'CANCELLED') {
      setActiveRequestId(-1);
    }
  }

  useEffect(() => {
    if (accessToken && activeRequestId > 0) {
      updateActiveRequest();
      const interval = setInterval(() => updateActiveRequest(), 5000);
      return () => {
        clearInterval(interval);
      };
    }
    return undefined;
  }, [activeRequestId]);

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
          console.log('got notif', n);
          setupNotificationContext(n);
          setActiveRequestId(
            (n.request.content.data.request as ReqModel).rq_id,
          );
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
      <NotificationContext.Provider
        value={{
          requestData,
          setRequestData,
          activeRequestId,
          setActiveRequestId,
          notificationContext,
          setNotificationContext,
        }}
      >
        <RequestModal
          visible={showRequestModal}
          handleShowModal={handleShowModal}
          animationType="slide"
          transparent
          notification={requestData}
          onAccept={() =>
            navigationRef.navigate(MainRoutes.RequestDetails as never)
          }
        />
        <NavigationContainer ref={navigationRef}>
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
                  name={MainRoutes.RequestDetails}
                  component={RequestDetailsScreen}
                />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfileScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </NotificationContext.Provider>
    </AuthContext.Provider>
  );
}
