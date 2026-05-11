"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const lodash_1 = __importDefault(require("lodash"));
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const constants_1 = require("../constants");
const utilities_1 = require("../utilities");
const enums_1 = require("../enums");
let AllExceptionFilter = class AllExceptionFilter {
    constructor(httpAdapterHost, configService, logger) {
        this.httpAdapterHost = httpAdapterHost;
        this.configService = configService;
        this.logger = logger;
    }
    catch(exception, host) {
        const httpAdapter = this.httpAdapterHost?.httpAdapter;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const isHttpException = exception instanceof common_1.HttpException;
        const isRpcContext = host.getType() === "rpc";
        const microserviceName = this.configService.get("app.microserviceName");
        const httpStatus = isHttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const errorData = {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            path: request.url,
        };
        if (isHttpException) {
            let exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === "string") {
                exceptionResponse = { message: exceptionResponse };
            }
            lodash_1.default.assign(errorData, {
                statusCode: exception.getStatus(),
                errorService: microserviceName,
            }, exceptionResponse);
        }
        else {
            this.logger.error({
                context: `AllExceptionFilter.catch`,
                error: exception,
                message: `A non-http error being throw somewhere`,
            });
            const rpcError = exception;
            lodash_1.default.assign(errorData, {
                statusCode: rpcError?.statusCode ||
                    constants_1.ERROR_RESPONSE.INTERNAL_SERVER_ERROR.statusCode,
                message: rpcError?.message || constants_1.ERROR_RESPONSE.INTERNAL_SERVER_ERROR.message,
                errorCode: rpcError.errorCode || constants_1.ERROR_RESPONSE.INTERNAL_SERVER_ERROR.errorCode,
                errorService: microserviceName,
                details: (0, utilities_1.convertErrorToObject)(exception),
            });
        }
        response.error = exception;
        const nodeEnv = this.configService.get("appCommon.nodeEnv");
        if (nodeEnv) {
            const isCriticalEnv = [enums_1.NodeEnv.Production, enums_1.NodeEnv.Staging].includes(nodeEnv);
            isCriticalEnv && delete errorData.details;
        }
        if (isRpcContext) {
            throw new common_1.HttpException(errorData, httpStatus);
        }
        if (!response.headersSent) {
            if (httpAdapter) {
                httpAdapter.reply(ctx.getResponse(), errorData, httpStatus);
            }
            else {
                response.status(httpStatus).json(errorData);
            }
        }
        else {
            this.logger.warn("Response already sent, skipping error response", {
                url: request.url,
                method: request.method,
            });
        }
    }
};
exports.AllExceptionFilter = AllExceptionFilter;
exports.AllExceptionFilter = AllExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __param(0, (0, common_1.Optional)()),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER)),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost,
        config_1.ConfigService,
        winston_1.Logger])
], AllExceptionFilter);
//# sourceMappingURL=all-exception.filter.js.map