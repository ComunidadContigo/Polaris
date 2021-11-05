/* eslint-disable camelcase */

export interface RefreshTokenPayload {
  u_id: number;
  email: string;
  first_name: string;
  last_name: string;
  isVetted: boolean;
  b_id: number;
  r_id: number;
}

export interface RefreshToken {
  u_id: number;
  token: string;
}
