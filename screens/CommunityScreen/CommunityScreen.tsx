import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../components/context';

const CommunityScreen = () => {
  const { setAccessToken } = useContext(AuthContext);
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Welcome to Community!</Text>
      <Button title="Sign Out" onPress={() => setAccessToken('')} />
      <StatusBar />
    </View>
  );
};

export default CommunityScreen;
