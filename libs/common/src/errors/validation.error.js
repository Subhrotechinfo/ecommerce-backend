"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message, details) {
        super(message);
        this.name = "ValidationError";
        this.detail = details;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=validation.error.js.map