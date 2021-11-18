export const getLatitude = (coordinates: string): string => {
  const coordinateString = coordinates.replace(/[(),]/g, '');
  const coordinateArray = coordinateString.split(' ');
  return coordinateArray[0];
};

export const getLongitude = (coordinates: string): string => {
  const coordinateString = coordinates.replace(/[(),]/g, '');
  const coordinateArray = coordinateString.split(' ');
  return coordinateArray[1];
};

export const getGoogleMapsURL = (coordinates: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${getLatitude(
    coordinates,
  )}%2C${getLongitude(coordinates)}`;
