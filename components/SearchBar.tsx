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
import { AuthContext } from './context';
import { RequestDetails } from './RequestDetails';

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
  const [expandedSearchBar, setExpandedSearchBar] = useState(false);
  const [requestStatus, setRequestStatus] = useState('');

  return (
    <View style={styles.container}>
      {requestStatus ? (
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
            onPress={() => {
              createRequest(
                accessToken,
                setAccessToken,
                uid,
                meetingLocation,
                destinationLocation,
              );
              setRequestStatus('ONGOING');
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
    top: 30,
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
