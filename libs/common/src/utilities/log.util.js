"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logBootstrapInfo = logBootstrapInfo;
const chalk_1 = __importDefault(require("chalk"));
const enums_1 = require("../enums");
const Logger_1 = require("nestjs-pino/Logger");
function logBootstrapInfo(app, logOptions) {
    const { tcpListener, nodeEnv, httpPort } = logOptions;
    const logger = app.get(Logger_1.Logger);
    if (nodeEnv === enums_1.NodeEnv.Production) {
        logger.log({
            message: `Application is running on port ${httpPort}`,
            context: "Application",
        });
        return;
    }
    const appAddressInfo = app.getHttpServer().address();
    let host = "localhost";
    if (typeof appAddressInfo === "object" && appAddressInfo !== null) {
        host =
            appAddressInfo.address === "::" ? "localhost" : appAddressInfo.address;
    }
    if (tcpListener) {
        logger.log({
            message: `TCP Microservice Listener is ready on ${chalk_1.default.blue(`${tcpListener?.host || "Unknown"}:${tcpListener?.port || "Unknown"}`)}`,
            context: "NestMicroservice",
        });
    }
    logger.log({
        message: `Microservice Application is ready. View Swagger at http://${host}:${httpPort}/swagger`,
        context: "Application",
    });
}
//# sourceMappingURL=log.util.js.map