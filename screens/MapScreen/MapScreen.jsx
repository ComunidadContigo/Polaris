import React from 'react';
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../components/context';
import { useContext } from 'react';
import MapView from 'react-native-maps';

const MapScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <MapView style={styles.map} provider='google' />
      <Button title='Sign Out' onPress={() => signOut()} />
      <StatusBar style='auto' />
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
