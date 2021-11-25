import { UserInfo } from './user.model';

export interface NotificationData {
  requesterInfo?: UserInfo | undefined;
  buddyInfo?: UserInfo | undefined;
  intervalId?: any;
}
