import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../../components/context';
import colors from '../../styles/colors';
import text from '../../styles/text';
import buttons from '../../styles/buttons';
import GreetingGraphics from '../../components/GreetingGraphics';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const submit = () => {
    console.log('Signin in');
    signIn(username);

    // const data = { name: username, pass: password };

    // fetch('https://example.com/profile', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
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
        placeholder='Username'
        onChangeText={() => setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={() => setPassword}
      />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => submit()}
          style={[buttons.button, colors.mainColors.background]}
          accessibilityLabel='LogIn button'
        >
          <Text style={[text.normalTextSize, colors.mainColors.text]}>
            Log in
          </Text>
        </TouchableOpacity>
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
