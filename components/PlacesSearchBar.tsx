import React, { Dispatch, SetStateAction, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import envs from '../config/environment';
import { Location } from '../models/Location';

interface Props {
  currentPin: { latitude: number; longitude: number };
  setCurrentPin: Dispatch<SetStateAction<Location>>;
  type: string;
  // eslint-disable-next-line no-unused-vars
  setExpandedSearchBar: (value: boolean) => void;
}

const PlacesSearchBar = (props: Props) => {
  const { setCurrentPin, currentPin, type, setExpandedSearchBar } = props;
  const ref = useRef();

  return (
    <GooglePlacesAutocomplete
      // onClick={setExpandedSearchBar(false)}
      ref={ref}
      placeholder="Search"
      fetchDetails
      GooglePlacesSearchQuery={{
        rankby: 'distance',
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        console.log('DESCRIPTION: ', data?.description);
        setCurrentPin({
          coordinates: {
            latitude: details!.geometry.location.lat,
            longitude: details!.geometry.location.lng,
          },
          description: data?.description,
        });
        setExpandedSearchBar(true);
      }}
      query={{
        key: envs?.DEV_GOOGLE_PLACES_API_KEY,
        language: 'en',
        types: 'establishment',
        radius: 30000,
        location: `${currentPin.latitude}, ${currentPin.longitude}`,
      }}
      debounce={500}
      enablePoweredByContainer={false}
      styles={type === 'meeting' ? meetingStyles : destinationStyles}
    />
  );
};

const meetingStyles = StyleSheet.create({
  container: {
    zIndex: 100,
    width: '90%',
    flex: 0,
    // top: '15%',
    paddingLeft: '2.5%',
    position: 'relative',
  },
  listView: { backgroundColor: 'white' },
});

const destinationStyles = StyleSheet.create({
  container: {
    zIndex: 100,
    width: '90%',
    flex: 0,
    top: 20,
    // position: 'relative',
  },
  listView: { backgroundColor: 'white' },
});

export default PlacesSearchBar;
