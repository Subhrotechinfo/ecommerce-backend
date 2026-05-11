import { HttpStatus, Type } from "@nestjs/common";
import {
  ApiBodyOptions,
  ApiParamOptions,
  ApiQueryOptions,
  ApiOperationOptions as SwaggerApiOperationOptions,
  ApiResponseOptions as SwaggerApiResponseOptions,
} from "@nestjs/swagger";
import { BodyContentType } from "../enums";
type ApiResponseOptions = SwaggerApiResponseOptions & {
  isPagination?: boolean;
  status?: HttpStatus;
  type?: Type<unknown>;
};
type ApiOperationOptions = SwaggerApiOperationOptions & {
  summary: string;
  operationId: string;
};
type ApiDocumentExtraOption = {
  isPublic?: true;
};
type ApiDocumentOption = {
  operation: ApiOperationOptions;
  contentType?: BodyContentType[];
  body?: ApiBodyOptions;
  response: ApiResponseOptions | ApiResponseOptions[];
  query?: ApiQueryOptions | ApiQueryOptions[];
  param?: ApiParamOptions | ApiParamOptions[];
  extra?: ApiDocumentExtraOption;
  tags?: string[];
};
declare function SwaggerApiDocument(
  options: ApiDocumentOption,
): <TFunction extends Function, Y>(
  target: TFunction | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;
export declare const ResponsePaginated: <Model extends Type<unknown>>(
  model: Model,
  { status, description }: ApiResponseOptions,
) => <TFunction extends Function, Y>(
  target: TFunction | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;
export { SwaggerApiDocument };
//# sourceMappingURL=api-document.decorator.d.ts.map
