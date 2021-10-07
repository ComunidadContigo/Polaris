import React from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../components/context';
import { useContext } from 'react';

const CommunityScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Welcome to Community!</Text>
      <Button title='Sign Out' onPress={() => signOut()} />
      <StatusBar style='auto' />
    </View>
  );
};

export default CommunityScreen;
