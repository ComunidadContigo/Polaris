import * as Location from 'expo-location';

export const getlocation = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();

  if (status !== 'granted') {
    console.log('Permission not granted');
  }
  console.log(status);
  const isLocationServicesEnabled =
    await Location.hasServicesEnabledAsync();

  console.log(isLocationServicesEnabled);
  while (true) {
    console.log('Getting Location');
    const userlocation = await Location.getCurrentPositionAsync({});
    console.log(userlocation);
  }
};
