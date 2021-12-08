import { Location } from '../../../models/Location.model';

/* eslint-disable arrow-body-style */
export const combineCoordinates = (location: Location): string => {
  return `(${location.coordinates.longitude.toString()}, ${location.coordinates.latitude.toString()})`;
};
