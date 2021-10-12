import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../components/context';

const MapScreen = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Map</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
      <StatusBar />
    </View>
  );
};

export default MapScreen;
