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
import { AuthContext } from '../../Components/context';
import colors from '../../Styles/colors';
import text from '../../Styles/text';
import buttons from '../../Styles/buttons';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);
  function submit() {
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
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.imageDesign}>
        <ImageBackground
          source={require('../../assets/Path21.png')}
          resizeMode='cover'
          style={styles.imageBackground}
        >
          <Image
            source={require('../../assets/undraw_dreamer.png')}
            style={styles.imageHero}
          ></Image>
        </ImageBackground>
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
    padding: 8,
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
  imageDesign: {
    height: '70%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  imageBackground: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageHero: {
    width: 150,
    height: 150,
    right: 50,
    top: 60,
  },
  heroTitleSection: {
    paddingHorizontal: '8%',
  },
});

export default SignInScreen;
