"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let LoggerModule = LoggerModule_1 = class LoggerModule {
    static forRoot(serviceName) {
        return {
            module: LoggerModule_1,
            imports: [
                nestjs_pino_1.LoggerModule.forRoot({
                    pinoHttp: {
                        name: serviceName,
                        transport: {
                            target: "pino-pretty",
                            options: {
                                singleLine: true,
                                translateTime: "HH:MM:ss Z",
                                ignore: "pid,hostname",
                            },
                        },
                    },
                }),
            ],
        };
    }
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = LoggerModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: {
                        target: "pino-pretty",
                        options: {
                            singleLine: true,
                            translateTime: "HH:MM:ss Z",
                            ignore: "pid,hostname",
                        },
                    },
                },
            }),
        ],
    }),
    (0, common_1.Module)({})
], LoggerModule);
//# sourceMappingURL=logger.module.js.map