"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerException = void 0;
const common_1 = require("@nestjs/common");
class ServerException extends common_1.HttpException {
    constructor(response, status) {
        const statusCode = status || response.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        super({ ...response }, statusCode);
    }
}
exports.ServerException = ServerException;
//# sourceMappingURL=server.exception.js.map