export type HttpError = {
  isSuccessful: false;
  statusCode?: number;
  friendlyErrorMessage?: string;
  errorMessage?: string;
  errorCode?: string;
};
