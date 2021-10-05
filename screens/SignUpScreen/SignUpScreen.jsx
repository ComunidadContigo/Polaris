import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import GreetingDesign from '../../components/GreetingGraphics';
import forms from '../../styles/forms';
import buttons from '../../styles/buttons';
import colors from '../../styles/colors';
import text from '../../styles/text';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const signUp = () => {
    Alert.alert('SignUp Received', 'Navigation should go on here...', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.greetingDesign}>
        <GreetingDesign />
      </View>
      <View style={styles.buttonWrapper}>
        <TextInput
          style={forms.inputField}
          placeholder='Name'
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={forms.inputField}
          placeholder='Last Name'
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={forms.inputField}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={forms.inputField}
          placeholder='Phone Number'
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType='numeric'
        />
        <TextInput
          style={forms.inputField}
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={forms.inputField}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[buttons.button, colors.mainColors.background]}
          onPress={() => signUp({ username, password })}
        >
          <Text style={[text.normalTextSize, colors.mainColors.text]}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    minHeight: 600,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  greetingDesign: {
    height: '30%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  buttonWrapper: {
    flex: 1,
    height: '70%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: '8%',
    paddingBottom: '5%',
  },
});

export default SignUpScreen;
