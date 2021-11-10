import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import SearchBar from '../../components/SearchBar';
import { Location } from '../../models/Location';

const normalZoomLevel = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = () => {
  const [currentLocation] = useState<Location>({
    coordinates: {
      latitude: 18.21194,
      longitude: -67.14225,
    },
    description: 'Current location',
  });

  const [meetingLocation, setMeetingLocation] = useState<Location>({
    ...currentLocation,
  });

  const [destinationLocation, setDestinationLocation] = useState<Location>(
    {
      ...currentLocation,
    },
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapView
          provider="google"
          style={styles.map}
          initialRegion={{
            ...meetingLocation.coordinates,
            ...normalZoomLevel,
          }}
        >
          <Marker
            coordinate={meetingLocation.coordinates}
            pinColor="green"
            draggable
            onDragStart={(e) => {
              console.log('Drag started. ', e.nativeEvent.coordinate);
            }}
            onDragEnd={(e) => {
              setMeetingLocation({
                coordinates: {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                },
                description: 'Dragged Pin',
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
