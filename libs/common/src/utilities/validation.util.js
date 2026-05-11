"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValidationErrors = formatValidationErrors;
exports.classValidatorExceptionFactory = classValidatorExceptionFactory;
const constants_1 = require("../constants");
const exceptions_1 = require("../exceptions");
function formatValidationErrors(errors) {
    const formattedErrors = {};
    for (const error of errors) {
        const { property, constraints, children } = error;
        if (constraints) {
            formattedErrors[property] = Object.values(constraints).join(", ");
        }
        else if (children && children.length > 0) {
            formattedErrors[property] = formatValidationErrors(children);
        }
    }
    return formattedErrors;
}
function classValidatorExceptionFactory(errors) {
    const details = formatValidationErrors(errors);
    const failedProperties = errors.map((e) => e.property).join(", ");
    const exceptionResponse = {
        ...constants_1.ERROR_RESPONSE.REQUEST_PAYLOAD_VALIDATION_ERROR,
        message: `ValidateFailed: ${failedProperties}`,
        details: details,
    };
    return new exceptions_1.ServerException(exceptionResponse);
}
//# sourceMappingURL=validation.util.js.map