import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../components/context';
import { sendRequestToFulfillNotification } from '../../services/localNotificationService';
import { getGoogleMapsURL } from '../../services/directionService';
import { Location } from '../../models/location';

interface Props {
  meetingLocation: Location;
}

const RequestDetailsScreen = (props: Props) => {
  const { meetingLocation } = props;
  const directionURL = getGoogleMapsURL(meetingLocation);
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>Request Details Screen</Text>
      <Button
        title="Simulate 'Found Request to Fulfill' notification"
        onPress={() => sendRequestToFulfillNotification()}
      />
    </View>
  );
};

export default RequestDetailsScreen;
