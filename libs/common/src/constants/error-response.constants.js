"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_RESPONSE = void 0;
const common_1 = require("@nestjs/common");
exports.ERROR_RESPONSE = {
    INTERNAL_SERVER_ERROR: {
        statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        errorCode: "internal_server_error",
        message: `Internal Server Error`,
    },
    UNAUTHORIZED: {
        statusCode: common_1.HttpStatus.UNAUTHORIZED,
        errorCode: "unauthorized",
        message: "Authentication required",
    },
    BAD_REQUEST: {
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        errorCode: "bad_request",
        message: `Bad Request`,
    },
    INVALID_CREDENTIALS: {
        statusCode: common_1.HttpStatus.UNAUTHORIZED,
        errorCode: "invalid_credentials",
        message: "Incorrect email or password. Please check your credentials and try again",
    },
    INVALID_EMAIL: {
        statusCode: common_1.HttpStatus.UNAUTHORIZED,
        errorCode: "invalid_email",
        message: "Invalid email",
        errorField: "email",
    },
    RESOURCE_FORBIDDEN: {
        statusCode: common_1.HttpStatus.FORBIDDEN,
        errorCode: "resource_forbidden",
        message: "Access denied",
    },
    RESOURCE_NOT_FOUND: {
        statusCode: common_1.HttpStatus.NOT_FOUND,
        errorCode: "resource_not_found",
        message: "Resource not found",
    },
    RESOURCE_ALREADY_EXISTED: {
        statusCode: common_1.HttpStatus.CONFLICT,
        errorCode: "resource_already_existed",
        message: "Resource already existed",
    },
    USER_NOT_FOUND: {
        statusCode: common_1.HttpStatus.NOT_FOUND,
        errorCode: "user_not_found",
        message: "User not found",
    },
    INVALID_PASSWORD: {
        statusCode: common_1.HttpStatus.UNAUTHORIZED,
        errorCode: "invalid_password",
        message: "The current password is incorrect",
        errorField: "currentPassword",
    },
    PASSWORD_NOT_CHANGED: {
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        errorCode: "password_not_changed",
        message: "New password cannot be the same as the old password",
        errorField: "newPassword",
    },
    UNPROCESSABLE_ENTITY: {
        statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        errorCode: "unprocessable_entity",
        message: `Unprocessable entity`,
    },
    REQUEST_PAYLOAD_VALIDATION_ERROR: {
        statusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
        errorCode: "request_payload_validation_error",
        message: "Invalid request payload data",
    },
    INVALID_FILES: {
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        errorCode: "invalid_files",
        message: `Invalid files`,
    },
    USER_ALREADY_EXISTS: {
        statusCode: common_1.HttpStatus.CONFLICT,
        errorCode: "user_already_exists",
        message: "Unable to create account with provided credentials",
    },
    EMAIL_NOT_VERIFIED: {
        statusCode: common_1.HttpStatus.UNAUTHORIZED,
        errorCode: "email_not_verified",
        message: "Email not verified",
    },
    USER_DEACTIVATED: {
        statusCode: common_1.HttpStatus.FORBIDDEN,
        errorCode: "user_deactivated",
        message: "Account access denied",
    },
    MAXIMUM_EMAIL_RESEND: {
        statusCode: common_1.HttpStatus.TOO_MANY_REQUESTS,
        errorCode: "maximum_email_resend",
        message: "Maximum email resend",
    },
    LINK_EXPIRED: {
        statusCode: common_1.HttpStatus.GONE,
        errorCode: "verification_link_expired",
        message: "Verification link has expired",
    },
};
//# sourceMappingURL=error-response.constants.js.map