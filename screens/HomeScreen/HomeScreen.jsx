import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button 
      title ="Press" 
      onPress = {() => navigation.navigate("SignIn")  }
      />
      <StatusBar style='auto' />
    </View>
  );
};

export default HomeScreen;
