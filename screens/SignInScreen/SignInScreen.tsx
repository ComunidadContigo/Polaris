import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AuthContext } from '../../components/context';
import http from '../../services/httpService';
import GreetingGraphics from '../../components/GreetingGraphics';
import Button from '../../components/Button';
import Login from '../../models/login.model';

const SignInScreen = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const submit = () => {
    const login: Login = {
      email: Username,
      password: Password,
    };
    console.log('Signin in');
    http.handleSignIn(login);
    signIn(Username, Password);
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
        <Button onPress={submit} label="LogIn" />
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
    paddingBottom: '70%',
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
