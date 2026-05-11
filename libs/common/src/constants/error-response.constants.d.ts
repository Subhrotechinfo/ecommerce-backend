import { HttpStatus } from "@nestjs/common";
export declare const ERROR_RESPONSE: {
  INTERNAL_SERVER_ERROR: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  UNAUTHORIZED: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  BAD_REQUEST: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  INVALID_CREDENTIALS: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  INVALID_EMAIL: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
    errorField: string;
  };
  RESOURCE_FORBIDDEN: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  RESOURCE_NOT_FOUND: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  RESOURCE_ALREADY_EXISTED: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  USER_NOT_FOUND: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  INVALID_PASSWORD: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
    errorField: string;
  };
  PASSWORD_NOT_CHANGED: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
    errorField: string;
  };
  UNPROCESSABLE_ENTITY: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  REQUEST_PAYLOAD_VALIDATION_ERROR: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  INVALID_FILES: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  USER_ALREADY_EXISTS: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  EMAIL_NOT_VERIFIED: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  USER_DEACTIVATED: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  MAXIMUM_EMAIL_RESEND: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
  LINK_EXPIRED: {
    statusCode: HttpStatus;
    errorCode: string;
    message: string;
  };
};
//# sourceMappingURL=error-response.constants.d.ts.map
