import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { sendRequestToFulfillNotification } from '../../services/localNotificationService';
import { getGoogleMapsURL } from '../../services/directionService';
import { Location } from '../../models/location';

interface Props {
  route: any;
  navigation: any;
}

const RequestDetailsScreen = (props: Props) => {
  const { route, navigation } = props;
  const { notification } = route.params;
  if (notification) {
    console.log(
      'GOTITTTT',
      notification.request.content.data.request.request_meeting_point,
    );
  }
  //   const directionURL = getGoogleMapsURL(meetingLocation);
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
