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
import http from '../../services/httpService';
import colors from '../../styles/colors';
import text from '../../styles/text';
import buttons from '../../styles/buttons';
import GreetingGraphics from '../../components/GreetingGraphics';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  const submit = (username, password) => {
    console.log('Signin in');
    http.handleSignIn(username);
    signIn(username, password);
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
        onChangeText={(val) => setUsername(val)}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={(val) => setPassword(val)}
      />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => submit(username, password)}
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
