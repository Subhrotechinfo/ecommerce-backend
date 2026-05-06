import { DynamicModule, Module } from "@nestjs/common";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";
@Module({
  imports: [
    PinoLoggerModule.forRoot({
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
})
@Module({})
export class LoggerModule {
  static forRoot(serviceName: string): DynamicModule {
    return {
      module: LoggerModule,
      imports: [
        PinoLoggerModule.forRoot({
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
}
