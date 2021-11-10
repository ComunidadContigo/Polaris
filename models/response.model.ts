export default interface HttpResponse {
  success: boolean;
  returnCode: number;
  messages: string[];
  errors: string[];
  rowCount?: number;

  data?: any;
  // eslint-disable-next-line semi
}
