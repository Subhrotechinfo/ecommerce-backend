"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertErrorToObject = convertErrorToObject;
const lodash_1 = __importDefault(require("lodash"));
function convertErrorToObject(error) {
    if (!error)
        return null;
    const safeError = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
        statusCode: error.statusCode,
        status: error.status,
    };
    return lodash_1.default.omitBy(safeError, lodash_1.default.isNil);
}
//# sourceMappingURL=error.util.js.map