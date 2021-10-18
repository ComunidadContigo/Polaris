import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import envs from '../config/environment';

interface Props {
  currentPin: { latitude: number; longitude: number };
  setCurrentPin: Dispatch<
    SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
  type: string;
}

const PlacesSearchBar = (props: Props) => {
  const { setCurrentPin, currentPin, type } = props;
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      fetchDetails
      GooglePlacesSearchQuery={{
        rankby: 'distance',
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setCurrentPin({
          latitude: details!.geometry.location.lat,
          longitude: details!.geometry.location.lng,
        });
      }}
      query={{
        key: envs?.DEV_GOOGLE_PLACES_API_KEY,
        language: 'en',
        types: 'establishment',
        radius: 30000,
        location: `${currentPin.latitude}, ${currentPin.longitude}`,
      }}
      styles={type === 'meeting' ? meetingStyles : destinationStyles}
    />
  );
};

const meetingStyles = StyleSheet.create({
  container: {
    zIndex: 100,
    width: '90%',
    flex: 0,
    top: 50,
    position: 'absolute',
  },
  listView: { backgroundColor: 'white' },
});

const destinationStyles = StyleSheet.create({
  container: {
    zIndex: 100,
    width: '90%',
    flex: 0,
    top: 120,
    position: 'absolute',
  },
  listView: { backgroundColor: 'white' },
});

export default PlacesSearchBar;
