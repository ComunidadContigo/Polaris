/* eslint-disable import/no-unresolved */

// Note: must update this file to have the changes to the .env seen by the app

import {
  DEV_AUTH_SERVICE_URL,
  DEV_BUDDY_SERVICE_URL,
  DEV_USER_SERVICE_URL,
  DEV_REALTIME_SERVICE_URL,
  DEV_DB_SERVICE_URL,
  DEV_GOOGLE_PLACES_API_KEY,
} from '@env';

const devEnvironmentVariables = {
  DEV_AUTH_SERVICE_URL,
  DEV_BUDDY_SERVICE_URL,
  DEV_USER_SERVICE_URL,
  DEV_REALTIME_SERVICE_URL,
  DEV_DB_SERVICE_URL,
  DEV_GOOGLE_PLACES_API_KEY,
};

// eslint-disable-next-line no-undef
export default __DEV__ ? devEnvironmentVariables : undefined;
