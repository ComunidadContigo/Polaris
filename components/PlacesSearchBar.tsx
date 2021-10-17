import React, { Dispatch, SetStateAction } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import envs from '../config/environment';

interface Props {
  currentLocation: { latitude: number; longitude: number };
  setMeetingLocation: Dispatch<
    SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
}

const PlacesSearchBar = (props: Props) => {
  const { setMeetingLocation, currentLocation } = props;
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
        setMeetingLocation({
          latitude: details!.geometry.location.lat,
          longitude: details!.geometry.location.lng,
        });
      }}
      query={{
        key: envs?.DEV_GOOGLE_PLACES_API_KEY,
        language: 'en',
        types: 'establishment',
        radius: 30000,
        location: `${currentLocation.latitude}, ${currentLocation.longitude}`,
      }}
      styles={{
        container: {
          zIndex: 100,
          width: '90%',
          flex: 0,
          top: 50,
          position: 'absolute',
        },
        listView: { backgroundColor: 'white' },
      }}
    />
  );
};

export default PlacesSearchBar;
