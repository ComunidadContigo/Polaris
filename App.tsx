import React, { useState } from 'react';
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

export default function App() {
  const [accessToken, setAccessToken] = useState('');
  const [uid, setUid] = useState('');

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
