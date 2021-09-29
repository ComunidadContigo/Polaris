import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const GreetingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Greeting Screen</Text>
      <Button title='Enter' onPress={() => navigation.navigate('SignIn')} />
      <StatusBar style='auto' />
    </View>
  );
};

export default GreetingScreen;
