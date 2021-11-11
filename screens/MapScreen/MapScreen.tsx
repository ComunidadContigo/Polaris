import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import SearchBar from '../../components/SearchBar';
import { getlocation } from '../../services/locationService';
import { Location } from '../../models/location';
import { siriusFetch } from '../../services/httpService';
import envs from '../../config/environment';
import { AuthContext } from '../../components/context';

const normalZoomLevel = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = () => {
  const { accessToken, setAccessToken, uid } = useContext(AuthContext);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    latitude: 18.21194,
    longitude: -67.14225,
  });

  const [meetingLocation, setMeetingLocation] = useState<Location>({
    ...currentLocation,
  });

  const [destinationLocation, setDestinationLocation] = useState<Location>(
    {
      ...currentLocation,
    },
  );
  // console.log('ML', meetingLocation);
  // console.log('DL', destinationLocation);

  useEffect(() => {
    LocationHandler();
  });
  const LocationHandler = async () => {
    // eslint-disable-next-line camelcase
    const location = await getlocation();
    console.log('Location');
    console.log(location);
    console.log('Curr');
    console.log(currentLocation);
    if (
      currentLocation.latitude !== location.latitude &&
      currentLocation.longitude !== location.longitude
    ) {
      const endpoint = `${envs?.DEV_USER_SERVICE_URL}/${uid}`;
      // eslint-disable-next-line camelcase
      const settings = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        // body: JSON.stringify({ user_last_location: location }),
        body: JSON.stringify({
          user_last_location: JSON.stringify(location),
        }),
        // `{"user_last_location" ${JSON.stringify(location)} }`,
      };
      console.log('logging Setting:');
      console.log(settings);
      console.log(settings.body);
      try {
        const res = await siriusFetch(
          accessToken,
          setAccessToken,
          uid,
          endpoint,
          settings,
        );
        console.log(res);
        setCurrentLocation(location);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapView
          provider="google"
          style={styles.map}
          initialRegion={{
            ...meetingLocation,
            ...normalZoomLevel,
          }}
        >
          <Marker
            coordinate={currentLocation}
            pinColor="green"
            draggable
            onDragStart={(e) => {
              console.log('Drag started. ', e.nativeEvent.coordinate);
            }}
            onDragEnd={(e) => {
              setMeetingLocation({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          >
            <Callout>
              <Text>Im Here!</Text>
            </Callout>
          </Marker>
        </MapView>
      </View>
      <SearchBar
        meetingLocation={meetingLocation}
        setMeetingLocation={setMeetingLocation}
        destinationLocation={destinationLocation}
        setDestinationLocation={setDestinationLocation}
      />
      <Text>Latitude : {currentLocation.latitude}</Text>
      <Text>Longitude : {currentLocation.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapView: {
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
