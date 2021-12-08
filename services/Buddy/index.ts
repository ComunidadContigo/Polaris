/* eslint-disable camelcase */
import { Location } from '../../models/Location.model';
import envs from '../../config/environment';
import { siriusFetch } from '../httpService';
import { ReqModel, RequestSettings } from '../../models/request.model';
import { combineCoordinates } from './common/functions';
import { RequestStatus } from '../../models/constants/request';

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
      r_id: await getRidFromUid(accessToken, setAccessToken, uid),
      stat: 'UNFULFILLED',
    }),
  };
  try {
    console.log('SETTINGS: ', settings);
    const res = await siriusFetch(
      accessToken,
      setAccessToken,
      uid,
      endpoint,
      settings,
    );
    console.log(res);
    // TODO: HAVE THIS RETURN THE REQUEST ID FROM THE BACKEND
    return res?.data.rq_id;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

/**
 * Returns buddy id from the user id.
 *
 * @param {string} accessToken JWT access token.
 * @param {any}  setAccessToken Function that sets the accessToken in case it expires.
 * @param {number}  uid User id to be used in the query.
 * @return {number} buddy id for the user if user is a buddy, null otherwise.
 */
export const getBidFromUid = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
): Promise<number | null> => {
  const endpoint = `${envs?.DEV_BUDDY_SERVICE_URL}/buddy/user/${uid}`;
  try {
    const res = await siriusFetch(
      accessToken,
      setAccessToken,
      uid,
      endpoint,
    );
    if (res?.success) {
      return res.data?.b_id;
    }
  } catch (e) {
    console.log([e, 'Error while getting the buddy id.']);
  }
  return null;
};

/**
 * Returns requester id from the user id.
 *
 * @param {string} accessToken JWT access token.
 * @param {any}  setAccessToken Function that sets the accessToken in case it expires.
 * @param {number}  uid User id to be used in the query.
 * @return {number} requester id for the user if user is a requester, null otherwise.
 */
export const getRidFromUid = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
): Promise<number | null> => {
  const endpoint = `${envs?.DEV_BUDDY_SERVICE_URL}/requester/user/${uid}`;
  try {
    const res = await siriusFetch(
      accessToken,
      setAccessToken,
      uid,
      endpoint,
    );
    if (res?.success) {
      return res.data?.r_id;
    }
  } catch (e) {
    console.log([e, 'Error while getting the requester id.']);
  }
  return null;
};

export const acceptRequest = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
  rq_id: number,
) => {
  try {
    const bid = await getBidFromUid(accessToken, setAccessToken, uid);
    if (bid) {
      try {
        const data = {
          b_id: bid,
          stat: RequestStatus.MATCHED,
        };
        return await updateRequest(
          accessToken,
          setAccessToken,
          uid,
          rq_id,
          data,
        );
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const cancelRequest = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
  rq_id: number,
) => {
  try {
    const bid = await getBidFromUid(accessToken, setAccessToken, uid);
    if (bid) {
      try {
        const data = {
          b_id: bid,
          stat: RequestStatus.CANCELLED,
        };
        return await updateRequest(
          accessToken,
          setAccessToken,
          uid,
          rq_id,
          data,
        );
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const updateRequest = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
  rq_id: number,
  data: any,
) => {
  const endpoint = `${envs?.DEV_BUDDY_SERVICE_URL}/request/${rq_id}`;
  const settings: RequestSettings = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      ...data,
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

/**
 * Returns request information by request id.
 *
 * @param {string} accessToken JWT access token.
 * @param {any}  setAccessToken Function that sets the accessToken in case it expires.
 * @param {number}  uid User id to be used in the query.
 * @return {request} Returns the request information from the db.
 */
export const getRequestInfo = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
  rq_id: number,
): Promise<ReqModel | undefined> => {
  const endpoint = `${envs?.DEV_BUDDY_SERVICE_URL}/request/${rq_id}`;
  try {
    const res = await siriusFetch(
      accessToken,
      setAccessToken,
      uid,
      endpoint,
    );
    if (res?.success) {
      return res.data;
    }
  } catch (e) {
    console.log([e, 'Error in getRequestInfo.']);
  }
  return undefined;
};
