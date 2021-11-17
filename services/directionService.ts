import { Location } from '../models/location';

export const getGoogleMapsURL = (location: Location): string =>
  // eslint-disable-next-line implicit-arrow-linebreak
  `https://www.google.com/maps/search/?api=1&query=${location.coordinates.latitude}%2C${location.coordinates.longitude}`;
