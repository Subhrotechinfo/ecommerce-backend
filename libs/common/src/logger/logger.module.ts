import { Module } from "@nestjs/common";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        name: "ProductService",
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
export class LoggerModule {}
