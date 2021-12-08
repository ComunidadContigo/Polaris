import * as expoLocation from 'expo-location';
import { Location } from '../models/Location.model';

export const getlocation = async () => {
  const { status } =
    await expoLocation.requestForegroundPermissionsAsync();
  // const prov = expoLocation.getProviderStatusAsync();
  // console.log(prov);
  if (status !== 'granted') {
    console.log('Permission not granted');
  }
  // console.log(status);
  const isLocationServicesEnabled =
    await expoLocation.hasServicesEnabledAsync();
  // console.log(isLocationServicesEnabled);

  console.log('Getting Location');
  const userlocation = await expoLocation.getCurrentPositionAsync({});
  console.log(userlocation.coords.latitude);
  console.log(userlocation.coords.longitude);
  const lat = userlocation.coords.latitude;
  const lon = userlocation.coords.longitude;
  const location: Location = {
    coordinates: { latitude: lat, longitude: lon },
    description: 'Latest Location',
  };
  return location;
};
