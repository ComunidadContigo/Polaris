import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import SearchBar from '../../components/SearchBar';
import { getlocation } from '../../services/locationService';
import { siriusFetch } from '../../services/httpService';
import envs from '../../config/environment';
import {
  AuthContext,
  NotificationContext,
} from '../../components/context';
import { Location } from '../../models/Location.model';
import { combineCoordinates } from '../../services/Buddy/common/functions';
import {
  getLatitude,
  getLongitude,
} from '../../services/directionService';
import { ReqModel } from '../../models/request.model';

const normalZoomLevel = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapScreen = () => {
  const { accessToken, setAccessToken, uid } = useContext(AuthContext);
  const {
    requestData,
  }: {
    requestData: ReqModel | undefined;
  } = useContext(NotificationContext);
  const [currentLocation, setCurrentLocation] = useState<Location>({
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
  // console.log('ML', meetingLocation);
  // console.log('DL', destinationLocation);

  useEffect(() => {
    LocationHandler();
  });
  const LocationHandler = async () => {
    // eslint-disable-next-line camelcase
    const location = await getlocation();
    if (
      currentLocation.coordinates.latitude !==
        location.coordinates.latitude &&
      currentLocation.coordinates.longitude !==
        location.coordinates.longitude
    ) {
      const endpoint = `${envs?.DEV_USER_SERVICE_URL}/${uid}`;
      // eslint-disable-next-line camelcase
      const settings = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        // body: JSON.stringify({ user_last_location: location }),
        // eslint-disable-next-line max-len
        // Currently Sending Coordinates And description but Varchar 100 only fits small description use location.coordinates if we decided not to store description.
        body: JSON.stringify({
          user_last_location: combineCoordinates(location),
        }),
        // `{"user_last_location" ${JSON.stringify(location)} }`,
      };
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

  const meetingLocationMarker = () => {
    if (meetingLocation.description !== 'Current location') {
      return (
        <Marker
          coordinate={meetingLocation.coordinates}
          // coordinate={meetingLocation.coordinates}
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
      );
    }
    return <></>;
  };
  const destinationLocationMarker = () => {
    if (destinationLocation.description !== 'Current location') {
      return (
        <Marker
          coordinate={destinationLocation.coordinates}
          // coordinate={meetingLocation.coordinates}
          pinColor="green"
          draggable
          onDragStart={(e) => {
            console.log('Drag started. ', e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            setDestinationLocation({
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
      );
    }
    return <></>;
  };
  const notificationMarker = () => {
    if (requestData) {
      const latitude: number = Number(
        getLatitude(requestData.request_meeting_point),
      );
      const longitude: number = Number(
        getLongitude(requestData.request_meeting_point),
      );
      const coordinates = {
        latitude,
        longitude,
      };
      return (
        <Marker
          coordinate={coordinates}
          // coordinate={meetingLocation.coordinates}
          pinColor="green"
        >
          <Callout>
            <Text>Im Here!</Text>
          </Callout>
        </Marker>
      );
    }
    return <></>;
  };
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
            coordinate={currentLocation.coordinates}
            // coordinate={meetingLocation.coordinates}
            pinColor="red"
          >
            <Callout>
              <Text>Im Here!</Text>
            </Callout>
          </Marker>
          {notificationMarker()}
          {meetingLocationMarker()}
          {destinationLocationMarker()}
        </MapView>
      </View>
      <SearchBar
        meetingLocation={meetingLocation}
        setMeetingLocation={setMeetingLocation}
        destinationLocation={destinationLocation}
        setDestinationLocation={setDestinationLocation}
      />
      {console.log(requestData)}
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
