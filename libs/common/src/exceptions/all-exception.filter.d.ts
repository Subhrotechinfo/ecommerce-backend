import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost } from "@nestjs/core";
import { Logger } from "winston";
export declare class AllExceptionFilter implements ExceptionFilter {
  private readonly httpAdapterHost;
  private readonly configService;
  private readonly logger;
  constructor(
    httpAdapterHost: HttpAdapterHost,
    configService: ConfigService,
    logger: Logger,
  );
  catch(exception: unknown, host: ArgumentsHost): void;
}
//# sourceMappingURL=all-exception.filter.d.ts.map
