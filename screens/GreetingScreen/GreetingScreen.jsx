import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const GreetingScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Greeting Screen</Text>
      <StatusBar style='auto' />
    </View>
  );
};

export default GreetingScreen;
