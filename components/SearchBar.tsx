import React, { Dispatch, SetStateAction } from 'react';
import PlacesSearchBar from './PlacesSearchBar';

// currentLocation={currentLocation}
// meetingLocation={meetingLocation}
// setMeetingLocation={setMeetingLocation}
// destinationLocation={destinationLocation}
// setDestinationLocation={setDestinationLocation}

interface Location {
  latitude: number;
  longitude: number;
}

interface Props {
  meetingLocation: Location;
  destinationLocation: Location;
  setMeetingLocation: Dispatch<
    SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
  setDestinationLocation: Dispatch<
    SetStateAction<{
      latitude: number;
      longitude: number;
    }>
  >;
}

const SearchBar = (props: Props) => {
  const {
    meetingLocation,
    destinationLocation,
    setMeetingLocation,
    setDestinationLocation,
  } = props;
  return (
    <>
      <PlacesSearchBar
        currentPin={meetingLocation}
        setCurrentPin={setMeetingLocation}
        type="meeting"
      />
      <PlacesSearchBar
        currentPin={destinationLocation}
        setCurrentPin={setDestinationLocation}
        type="destination"
      />
    </>
  );
};

export default SearchBar;
