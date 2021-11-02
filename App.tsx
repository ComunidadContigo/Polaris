import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import { AuthContext } from './components/context';

// Screens
import GreetingScreen from './screens/GreetingScreen/GreetingScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import EditProfileScreen from './screens/ProfileScreens/EditProfileScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';

// Routes
import { MainRoutes } from './routing/StackRoutes';

const Stack = createNativeStackNavigator();

export default function App() {
  const [accessToken, setAccessToken] = useState('');
  const [uid, setUid] = useState('');

  // const [isLoading, setIsLoading] = useState(true);
  const getlocation = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission not granted');
    }
    console.log(status);
    const isLocationServicesEnabled =
      await Location.hasServicesEnabledAsync();
    console.log(isLocationServicesEnabled);
    console.log('Getting Location');
    const userlocation = await Location.getLastKnownPositionAsync({});

    console.log('Showing Location');
    console.log(userlocation);
  };
  getlocation();

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
