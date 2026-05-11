"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appCommonConfiguration = exports.getAppCommonConfig = void 0;
const enums_1 = require("../enums");
const config_1 = require("@nestjs/config");
const getAppCommonConfig = () => ({
    nodeEnv: process.env.NODE_ENV || enums_1.NodeEnv.Local,
    frontendUrl: process.env.FRONTEND_URL,
    timezone: process.env.TZ || "UTC",
    MONGODB_URI: process.env.MONGODB_URI,
});
exports.getAppCommonConfig = getAppCommonConfig;
exports.appCommonConfiguration = (0, config_1.registerAs)("appCommon", exports.getAppCommonConfig);
//# sourceMappingURL=app-common.config.js.map