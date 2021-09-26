import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import GreetingScreen from './screens/GreetingScreen/GreetingScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import HomeScreen from './screens/HomeScreen/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // const [userToken, setUserToken] = useState('USERTOKEN');
  const [userToken, setUserToken] = useState();

  const [isSignout, setSignout] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
        {userToken == null ? (
          <>
            <Stack.Screen
              name='GreetingScreen'
              component={GreetingScreen}
            />
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name='Home' component={HomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
