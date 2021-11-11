import { Location } from '../../models/Location';
import envs from '../../config/environment';
import { siriusFetch } from '../httpService';
import { RequestSettings } from '../../models/request.model';
import { combineCoordinates } from './common/functions';

export const createRequest = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
  meetingPoint: Location,
  destinationPoint: Location,
) => {
  const endpoint = `${envs?.DEV_BUDDY_SERVICE_URL}/request`;
  const currentDate = new Date();
  const settings: RequestSettings = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      request_date: currentDate.toISOString(),
      request_meeting_point: combineCoordinates(meetingPoint),
      request_destination: combineCoordinates(destinationPoint),
      r_id: '1',
      stat: 'UNFULLFILLED',
    }),
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
  } catch (e) {
    console.log(e);
  }
  return undefined;
};
