import { Type } from "@nestjs/common";
type PropertyType = Type<unknown> | Function | Record<string, any> | "file";
interface DtoPropertyOptions {
  type: PropertyType;
  structure?: "array" | "enum" | "enumArray" | "dto" | "dtoArray";
  validated?: boolean;
  required?: boolean;
  example?: any;
  defaultValue?: any;
  description?: string;
  validateGroup?: string[];
}
export declare function ApiPropertyExtended(
  options: DtoPropertyOptions,
): PropertyDecorator;
export declare function ValidateTransform(
  options: DtoPropertyOptions,
): <TFunction extends Function, Y>(
  target: TFunction | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;
declare function PropertyDto(
  options?: DtoPropertyOptions,
): <TFunction extends Function, Y>(
  target: TFunction | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;
export { PropertyDto };
//# sourceMappingURL=property-dto.decorator.d.ts.map
