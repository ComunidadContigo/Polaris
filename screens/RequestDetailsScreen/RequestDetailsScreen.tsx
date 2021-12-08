import React, { useCallback, useContext } from 'react';
import { View, Text, Alert, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Avatar } from 'react-native-paper';
import {
  getGoogleMapsURL,
  getLatitude,
  getLongitude,
} from '../../services/directionService';
import Button from '../../components/Button';
import { bigTextSize } from '../../styles/text';
import { MainRoutes } from '../../routing/StackRoutes';
import {
  AuthContext,
  NotificationContext,
} from '../../components/context';
import { NotificationData } from '../../models/Notification.model';
import { ReqModel } from '../../models/request.model';
import { cancelRequest } from '../../services/Buddy';

interface Props {
  navigation: any;
}

const RequestDetailsScreen = (props: Props) => {
  const { navigation } = props;
  const { accessToken, setAccessToken, uid } = useContext(AuthContext);
  const {
    requestData,
    notificationContext,
    setActiveRequestId,
  }: {
    requestData: ReqModel | undefined;
    notificationContext: NotificationData;
    setActiveRequestId: React.Dispatch<React.SetStateAction<number>>;
  } = useContext(NotificationContext);
  let directionURL = '';
  let meetingCoordinates = '';
  if (requestData) {
    meetingCoordinates = requestData.request_meeting_point;
    directionURL = getGoogleMapsURL(meetingCoordinates);
  }

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(directionURL);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(directionURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${directionURL}`);
    }
  }, [directionURL]);

  const isRequester = (): boolean =>
    uid === notificationContext?.requesterInfo?.u_id;

  const onCancel = () => {
    if (requestData?.rq_id) {
      cancelRequest(accessToken, setAccessToken, uid, requestData.rq_id);
    }
    setActiveRequestId(-1);
  };

  return (
    <View style={styles.screenWrapper}>
      <View>
        <Icon
          name="leftcircleo"
          color="#000"
          size={26}
          onPress={() => navigation.navigate(MainRoutes.Home)}
        />
      </View>
      <View>
        <Text style={styles.header}>Your trip is {requestData?.stat}</Text>
        <Text>{meetingCoordinates}</Text>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.body}>
        <View style={styles.cardBody}>
          <Text>You will be meeting</Text>
          <View style={styles.userInfo}>
            <View style={styles.profileImage}>
              <Avatar.Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/lego/1.jpg',
                }}
                size={100}
              />
            </View>
            {isRequester() ? (
              <View style={styles.profileInfo}>
                <Text>
                  {notificationContext.requesterInfo?.first_name}
                </Text>
                <Text>
                  Lat:
                  {getLatitude(meetingCoordinates)}
                </Text>
                <Text>
                  Lon:
                  {getLongitude(meetingCoordinates)}
                </Text>
                <Text>{notificationContext.requesterInfo?.gender}</Text>
              </View>
            ) : (
              <View style={styles.profileInfo}>
                <Text>
                  {notificationContext?.requesterInfo?.first_name}
                </Text>
                <Text>
                  Lat:
                  {getLatitude(meetingCoordinates)}
                </Text>
                <Text>
                  Lon:
                  {getLongitude(meetingCoordinates)}
                </Text>
                <Text>{notificationContext?.requesterInfo?.gender}</Text>
              </View>
            )}
          </View>
          <Button label="Get directions" onPress={() => handlePress()} />
        </View>
        <View>
          <Button
            label="Cancel trip"
            onPress={() => onCancel()}
            customStyle="cancelButton"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    padding: '5%',
    paddingTop: '15%',
  },
  header: {
    marginTop: '10%',
    fontSize: bigTextSize,
    color: '#000',
  },
  horizontalLine: {
    width: '100%',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginVertical: '8%',
  },
  profileImage: { marginTop: '5%' },
  cardBody: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 6,
    padding: 20,
    marginBottom: '8%',
  },
  userInfo: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    maxWidth: '60%',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '70%',
  },
});

export default RequestDetailsScreen;
