import { INestApplication } from "@nestjs/common";
import { NodeEnv } from "../enums";
interface LogBootstrapOptions {
  nodeEnv: NodeEnv;
  httpPort: number | string;
  tcpListener?: Record<string, any>;
}
export declare function logBootstrapInfo(
  app: INestApplication,
  logOptions: LogBootstrapOptions,
): void;
export {};
//# sourceMappingURL=log.util.d.ts.map
