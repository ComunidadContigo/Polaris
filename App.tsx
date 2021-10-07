import React, { useMemo, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import GreetingScreen from './screens/GreetingScreen/GreetingScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
// import HomeScreen from './screens/HomeScreen/HomeScreen';
import EditProfileScreen from './screens/ProfileScreens/EditProfileScreen';
import { AuthContext } from './components/context';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Title } from 'react-native-paper';
const Stack = createNativeStackNavigator();

export default function App() {
  const [userToken, setUserToken] = useState('');

  const [isSignout, setSignout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const authContext = useMemo(
    () => ({
      signIn: (username: any, password: any) => {
        console.log(username);
        console.log(password);
        //if username y password matchea db pues setea token pa poder entrar
        setUserToken('tok');
        setIsLoading(false);
      },
      signOut: () => {
        setUserToken('');
      },
      signUp: () => {
        setUserToken('tok');
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken == '' ? (
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
              <Stack.Screen
                name='EditProfile'
                component={EditProfileScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
