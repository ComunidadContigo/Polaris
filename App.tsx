import React, { useMemo, useState } from 'react';
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
  const [userToken, setUserToken] = useState('');

  // const [isLoading, setIsLoading] = useState(true);

  const authContext = useMemo(
    () => ({
      signIn: (username: any, password: any) => {
        console.log(username);
        console.log(password);
        // if username y password matchea db pues setea token pa poder entrar
        setUserToken('tok');
        // setIsLoading(false);
      },
      signOut: () => {
        setUserToken('');
      },
      signUp: () => {
        setUserToken('tok');
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken === '' ? (
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
