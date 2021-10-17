import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import PlacesSearchBar from '../../components/PlacesSearchBar';

const MapScreen = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 18.21194,
    longitude: -67.14225,
  });
  const [meetingLocation, setMeetingLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <MapView
          provider="google"
          style={styles.map}
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
      <PlacesSearchBar />
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
  searchBar: {
    width: '100%',
    // height: '10%',
    zIndex: 100,
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
