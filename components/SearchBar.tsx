import React, {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlacesSearchBar from './PlacesSearchBar';
import SelectedLocation from './SelectedLocation';
import Button from './Button';
import { Location } from '../models/Location';
import { createRequest } from '../services/Buddy/index';
import { AuthContext, NotificationContext } from './context';
import { RequestDetails } from './RequestDetails';
import { getUserFromUid } from '../services/User';
import { NotificationData } from '../models/Notification.model';

interface Props {
  meetingLocation: Location;
  destinationLocation: Location;
  setMeetingLocation: Dispatch<SetStateAction<Location>>;
  setDestinationLocation: Dispatch<SetStateAction<Location>>;
}

const SearchBar = (props: Props) => {
  const {
    meetingLocation,
    destinationLocation,
    setMeetingLocation,
    setDestinationLocation,
  } = props;

  const { accessToken, setAccessToken, uid } = useContext(AuthContext);
  const {
    activeRequestId,
    setActiveRequestId,
    setNotificationContext,
  }: {
    activeRequestId: number;
    setActiveRequestId: React.Dispatch<React.SetStateAction<number>>;
    setNotificationContext: React.Dispatch<
      React.SetStateAction<NotificationData | undefined>
    >;
  } = useContext(NotificationContext);
  const [expandedSearchBar, setExpandedSearchBar] = useState(false);

  return (
    <View style={styles.container}>
      {activeRequestId > 0 ? (
        <RequestDetails />
      ) : (
        <View style={styles.search}>
          <View style={styles.icon}>
            <Icon name="search" color="grey" size={16} />
          </View>
          <PlacesSearchBar
            currentPin={meetingLocation.coordinates}
            setCurrentPin={
              expandedSearchBar
                ? setMeetingLocation
                : setDestinationLocation
            }
            type="meeting"
            setExpandedSearchBar={setExpandedSearchBar}
          />
        </View>
      )}

      {/* Show Expanded Search Bar (choose destination and meeting points) */}
      {expandedSearchBar ? (
        <>
          <SelectedLocation
            type="Meeting"
            location={meetingLocation.description}
          />
          <SelectedLocation
            type="Destination"
            location={destinationLocation.description}
          />
          <Button
            label="Find me a buddy"
            onPress={async () => {
              const requestId = await createRequest(
                accessToken,
                setAccessToken,
                uid,
                meetingLocation,
                destinationLocation,
              );
              if (requestId) {
                setActiveRequestId(requestId);
                try {
                  const userInfo = await getUserFromUid(
                    accessToken,
                    setAccessToken,
                    uid,
                  );
                  setNotificationContext({ requesterInfo: userInfo });
                } catch (e) {
                  console.log(e);
                }
              }
              setExpandedSearchBar(false);
            }}
          />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    minHeight: 44,
    position: 'absolute',
    top: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  search: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
});

export default SearchBar;
