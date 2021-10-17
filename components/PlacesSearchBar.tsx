import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import envs from '../config/environment';

const PlacesSearchBar = () => (
  <GooglePlacesAutocomplete
    placeholder="Search"
    fetchDetails
    GooglePlacesSearchQuery={{
      rankby: 'distance',
    }}
    onPress={(data, details = null) => {
      // 'details' is provided when fetchDetails = true
      console.log(data, details);
      // setMeetingLocation({
      //   latitude: details.geometry.location.lat,
      //   longitude: details.geometry.location.lng,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,
      // });
    }}
    query={{
      key: envs?.DEV_GOOGLE_PLACES_API_KEY,
      language: 'en',
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

export default PlacesSearchBar;
