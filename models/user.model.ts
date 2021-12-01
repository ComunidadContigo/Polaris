/* eslint-disable camelcase */
export default interface User {
  u_id?: number;
  email: string;
  password: string;
  phone_number: string;
  birth_date: string;
  first_name: string;
  gender: string;
  last_name: string;
  isVetted?: boolean;
  b_id?: number;
  r_id?: number;
  buddify?: boolean;
  // eslint-disable-next-line semi
}

export interface UserInfo {
  email: string;
  phone_number: string;
  birth_date: string;
  first_name: string;
  last_name: string;
  gender: string;
  u_id: number;
}
