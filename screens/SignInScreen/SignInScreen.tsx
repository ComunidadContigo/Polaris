import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AuthContext } from '../../components/context';
import http from '../../services/httpService';
import GreetingGraphics from '../../components/GreetingGraphics';
import Button from '../../components/Button';
import Login from '../../models/login.model';
import envs from '../../config/environment';
import HttpResponse from '../../models/response.model';
import { storeToken, getAccessToken } from '../../services/tokenService';

const SignInScreen = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const { accessToken, setAccessToken, setUid } = useContext(AuthContext);

  const handleSignIn = async (
    login: Login,
  ): Promise<string | undefined> => {
    const settings = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(login),
    };
    try {
      const response = await fetch(
        `${envs?.DEV_AUTH_SERVICE_URL}/login`,
        settings,
      );
      const res: HttpResponse = await response.json();
      console.log('DATA:', res?.data);
      if (res.success) {
        // Store refresh token in local storage
        storeToken(res?.data?.token);
        // Set uid in context for use during access token refresh
        setUid(res?.data?.u_id);
        // Get access token from the refresh token
        setAccessToken(await getAccessToken(res?.data));
      } else {
        setAccessToken('');
      }
    } catch (e) {
      console.log(e);
    }
    return accessToken;
    // const data: HttpResponse = await response.json();

    // console.log(response);
    // console.log(data);
  };

  const submit = async () => {
    const login: Login = {
      email: Username,
      password: Password,
    };
    await handleSignIn(login);

  };
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={styles.greetingDesign}>
        <GreetingGraphics />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(val) => setUsername(val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(val) => setPassword(val)}
      />
      <View style={styles.buttonWrapper}>
        <Button onPress={() => submit()} label="LogIn" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 3,
    borderColor: 'transparent',
    borderBottomColor: 'purple',
    padding: 4,
    margin: 10,
    width: 300,
  },
  buttonWrapper: {
    flex: 1,
    height: '30%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: '8%',
    paddingBottom: '5%',
  },
  greetingDesign: {
    height: '70%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  imageDesign: {
    height: '70%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  heroTitleSection: {
    paddingHorizontal: '8%',
  },
});

export default SignInScreen;
