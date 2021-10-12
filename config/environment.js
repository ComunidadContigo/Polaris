import {
  DEV_AUTH_SERVICE_URL,
  DEV_BUDDY_SERVICE_URL,
  DEV_USER_SERVICE_URL,
  DEV_REALTIME_SERVICE_URL,
  DEV_DB_SERVICE_URL,
} from '@env';

const devEnvironmentVariables = {
  DEV_AUTH_SERVICE_URL,
  DEV_BUDDY_SERVICE_URL,
  DEV_USER_SERVICE_URL,
  DEV_REALTIME_SERVICE_URL,
  DEV_DB_SERVICE_URL,
};

export default __DEV__ ? devEnvironmentVariables : undefined;
