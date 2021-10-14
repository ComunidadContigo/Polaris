import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

const MapScreen = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 18.21194,
    longitude: -67.14225,
  });
  const [meetingLocation, setMeetingLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState(null);

  console.log('CL: ', currentLocation);
  console.log('ML: ', meetingLocation);
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={{
          ...currentLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
