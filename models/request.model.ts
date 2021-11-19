/* eslint-disable camelcase */
export interface RequestSettings {
  headers: {};
  method: string;
  body: string;
}

export interface RequestBody {
  request_date: string;
  request_meeting_point: string;
  stat: string;
  request_destination: string;
  r_id: number;
}

export interface ReqModel {
  rq_id?: number;
  request_date: string;
  request_meeting_point: string;
  stat: string;
  request_destination: string;
  r_id: number;
  b_id?: number;
}
