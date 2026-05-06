import { Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { getAppCommonConfig } from "../config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: getAppCommonConfig().MONGODB_URI,
      }),
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
