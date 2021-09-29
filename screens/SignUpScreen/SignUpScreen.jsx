import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

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
    <View>
      <TextInput placeholder='Name' value={name} onChangeText={setName} />
      <TextInput
        placeholder='Last Name'
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder='Phone Number'
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title='Sign up'
        onPress={() => signUp({ username, password })}
      />
    </View>
  );
};

export default SignUpScreen;
