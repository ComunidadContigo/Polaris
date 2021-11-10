import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../components/context';
import { sendNotification } from '../../services/localNotificationService';

const CommunityScreen = () => {
  const { setAccessToken } = useContext(AuthContext);
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Welcome to Community!</Text>
      <Button title="Sign Out" onPress={() => setAccessToken('')} />
      <Button
        title="Simulate 'Found Request to Fulfill' notification"
        onPress={() => sendNotification('Found a request to fulfill!', '', 'sup')}
      />
      <StatusBar />
    </View>
  );
};

export default CommunityScreen;
