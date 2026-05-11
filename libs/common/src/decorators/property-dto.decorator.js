"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPropertyExtended = ApiPropertyExtended;
exports.ValidateTransform = ValidateTransform;
exports.PropertyDto = PropertyDto;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const lodash_1 = __importDefault(require("lodash"));
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const exceptions_1 = require("../exceptions");
function ApiPropertyExtended(options) {
    if (options === undefined || lodash_1.default.isEmpty(options)) {
        return (0, swagger_1.ApiProperty)({
            required: false,
        });
    }
    const { structure, ...propertyOptions } = options;
    const isFile = propertyOptions.type === "file";
    const type = (isFile ? String : propertyOptions.type);
    const isEnum = structure === "enum" || structure === "enumArray";
    const isArray = structure === "array" ||
        structure === "enumArray" ||
        structure === "dtoArray";
    const example = lodash_1.default.get(propertyOptions, "defaultValue", propertyOptions.example);
    const apiOptions = {
        ...propertyOptions,
        type,
        ...(isFile && { format: "binary" }),
        ...(isEnum && { enum: type, enumName: type.name }),
        isArray,
        example,
        required: propertyOptions.required,
    };
    return (0, swagger_1.ApiProperty)(apiOptions);
}
function ValidateTransform(options) {
    if (options === undefined || lodash_1.default.isEmpty(options)) {
        return (0, common_1.applyDecorators)((0, class_transformer_1.Expose)(), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateIf)(() => (0, class_validator_1.isEmpty)(options?.validateGroup)));
    }
    const { structure, validated, validateGroup, ...propertyOptions } = {
        validated: false,
        required: false,
        ...options,
    };
    const isFile = propertyOptions.type === "file";
    const type = (isFile ? String : propertyOptions.type);
    const isEnum = structure === "enum" || structure === "enumArray";
    const isDto = structure === "dto" || structure === "dtoArray";
    const isArray = structure === "array" ||
        structure === "enumArray" ||
        structure === "dtoArray";
    const decorators = [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.ValidateIf)(() => (0, class_validator_1.isEmpty)(validateGroup)),
    ];
    if (propertyOptions.required && !isFile) {
        decorators.push((0, class_validator_1.IsNotEmpty)({ each: isArray, groups: validateGroup }));
    }
    else {
        decorators.push((0, class_validator_1.IsOptional)({ each: isArray, groups: validateGroup }));
    }
    if (lodash_1.default.has(propertyOptions, "defaultValue")) {
        if (isDto) {
            throw new errors_1.ValidationError(`Property ${type.name} is a DTO but defaultValue set. Please set defaultValue in child DTO instead`);
        }
        if (propertyOptions.required) {
            throw new errors_1.ValidationError(`Property ${type.name} is required but defaultValue set. Please remove defaultValue`);
        }
        const setDefaultValue = (0, class_transformer_1.Transform)(({ value }) => {
            if (value === undefined) {
                if (!propertyOptions.defaultValue)
                    return;
                return propertyOptions.defaultValue;
            }
            return value;
        });
        decorators.push(setDefaultValue);
    }
    if (isDto) {
        decorators.push((0, class_transformer_1.Type)((obj) => type));
    }
    if (validated) {
        switch (type) {
            case String:
                decorators.push((0, class_validator_1.IsString)({ each: isArray, groups: validateGroup }));
                break;
            case Number:
                decorators.push((0, class_transformer_1.Type)((obj) => Number), (0, class_validator_1.IsNumber)({}, { each: isArray, groups: validateGroup }));
                break;
            case Date:
                decorators.push((0, class_validator_1.IsDate)({ each: isArray, groups: validateGroup }));
                break;
            case Boolean:
                decorators.push((0, class_transformer_1.Transform)((option) => {
                    const { value, key } = option;
                    if ((0, class_validator_1.isEmpty)(value))
                        return;
                    if ((0, class_validator_1.isBoolean)(value))
                        return value;
                    if (!(0, class_validator_1.isBooleanString)(value)) {
                        throw new exceptions_1.ServerException({
                            ...constants_1.ERROR_RESPONSE.REQUEST_PAYLOAD_VALIDATION_ERROR,
                            message: `Property ${key} is not boolean`,
                            details: { isPropertyDto: true, debug: option },
                        });
                    }
                    return value === "true";
                }), (0, class_transformer_1.Type)((obj) => String));
                break;
            default:
                if (type && !isEnum && !isDto) {
                    common_1.Logger.warn(`Property type ${type.name} is not Primitive type but are not specified structure (enum, dto)`);
                }
        }
        if (isArray) {
            decorators.push((0, class_validator_1.IsArray)({ groups: validateGroup }));
        }
        if (isEnum) {
            decorators.push((0, class_validator_1.IsEnum)(type, { each: isArray, groups: validateGroup }));
        }
        if (isArray && !isDto) {
            decorators.push((0, class_transformer_1.Transform)(({ value }) => {
                if ((0, class_validator_1.isEmpty)(value))
                    return value;
                if (Array.isArray(value))
                    return value;
                return [value];
            }));
        }
        if (isDto) {
            decorators.push((0, class_validator_1.ValidateNested)({
                each: isArray,
                message: (arg) => `Field ${arg.property} with type=${type.name} can not validate nested`,
                groups: validateGroup,
            }));
        }
    }
    return (0, common_1.applyDecorators)(...decorators);
}
function PropertyDto(options) {
    return (0, common_1.applyDecorators)(ApiPropertyExtended(options), ValidateTransform(options));
}
//# sourceMappingURL=property-dto.decorator.js.map