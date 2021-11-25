import { UserInfo } from '../../models/user.model';
import envs from '../../config/environment';
import { siriusFetch } from '../httpService';

export const getUserFromUid = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
): Promise<UserInfo | undefined> => {
  const endpoint = `${envs?.DEV_USER_SERVICE_URL}/${uid}`;
  try {
    const res = await siriusFetch(
      accessToken,
      setAccessToken,
      uid,
      endpoint,
    );
    console.log(res);
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export const getUserFromRid = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
  rid: number,
): Promise<UserInfo | undefined> => {
  // https://sirius-ingress-gabgc.cloud.okteto.net/user/requester/1
  const endpoint = `${envs?.DEV_USER_SERVICE_URL}/requester/${rid}`;
  try {
    const res = await siriusFetch(
      accessToken,
      setAccessToken,
      uid,
      endpoint,
    );
    if (res?.success) {
      return res?.data;
    }
    throw res?.errors;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export const getUserFromBid = async (
  accessToken: string | undefined,
  setAccessToken: any,
  uid: number,
  bid: number,
): Promise<UserInfo | undefined> => {
  const endpoint = `${envs?.DEV_USER_SERVICE_URL}/buddy/${bid}`;
  try {
    const res = await siriusFetch(
      accessToken,
      setAccessToken,
      uid,
      endpoint,
    );
    return res?.data;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};
