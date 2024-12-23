export type ErrorResponse =
  | { type: 'USER_NOT_FOUND'; message: string }
  | { type: 'INTERNAL_SERVER_ERROR'; message: string }
  | { type: 'VALIDATION_ERROE'; message: string }
  | { type: 'CREATE_USER'; message: string }
  | { type: 'DEFAULT'; message: string };
