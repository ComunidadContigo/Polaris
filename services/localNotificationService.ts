import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';
import Constants from 'expo-constants';

export const sendNotification = async (
  title: string,
  body?: string,
  data?: any,
) => {
  const content: Notifications.NotificationContentInput = {
    title,
    body,
    data,
  };
  const notificationRequestInput: Notifications.NotificationRequestInput =
    {
      content,
      trigger: null,
    };
  await Notifications.scheduleNotificationAsync(notificationRequestInput);
};

export const registerForPushNotificationsAsync =
  async (): Promise<string> => {
    let token: string;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return '';
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      Alert.alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    // TODO save token in DB
    return token!;
  };
