import { NodeEnv } from "../enums";
export declare const getAppCommonConfig: () => {
  nodeEnv: NodeEnv;
  frontendUrl: string;
  timezone: string;
  MONGODB_URI: string;
};
export declare const appCommonConfiguration: (() => {
  nodeEnv: NodeEnv;
  frontendUrl: string;
  timezone: string;
  MONGODB_URI: string;
}) &
  import("@nestjs/config").ConfigFactoryKeyHost<{
    nodeEnv: NodeEnv;
    frontendUrl: string;
    timezone: string;
    MONGODB_URI: string;
  }>;
//# sourceMappingURL=app-common.config.d.ts.map
