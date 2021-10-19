export default interface HttpResponse<E = never> {
  success: boolean;
  returnCode: number;
  messages: string[];
  errors: string[];
  rowCount?: number;
  data?: E;
  // eslint-disable-next-line semi
}
