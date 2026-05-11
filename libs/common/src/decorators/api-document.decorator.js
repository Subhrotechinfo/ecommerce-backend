"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsePaginated = void 0;
exports.SwaggerApiDocument = SwaggerApiDocument;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
function SwaggerApiDocument(options) {
    const { response: responseOptions, operation, param, query, body, extra, tags, contentType, } = options;
    const decorators = [
        (0, swagger_1.ApiOperation)(operation),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            description: "Oops, something went wrong",
            type: dto_1.HttpErrorResponseDto,
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.BAD_REQUEST,
            description: "Bad Request",
        }),
        (0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
            description: "Validate request payload error",
        }),
    ];
    if (!extra?.isPublic) {
        decorators.push((0, swagger_1.ApiResponse)({
            status: common_1.HttpStatus.UNAUTHORIZED,
            description: "Unauthorized",
        }));
    }
    if (contentType?.length) {
        decorators.push((0, swagger_1.ApiConsumes)(...contentType));
    }
    if (tags?.length) {
        decorators.push((0, swagger_1.ApiTags)(...tags));
    }
    if (body) {
        decorators.push((0, swagger_1.ApiBody)(body));
    }
    if (Array.isArray(responseOptions)) {
        responseOptions.forEach((option) => addApiResponse(option, decorators));
    }
    else {
        addApiResponse(responseOptions, decorators);
    }
    if (query && Array.isArray(query)) {
        decorators.push(...query.map((opt) => (0, swagger_1.ApiQuery)(opt)));
    }
    else if (query) {
        decorators.push((0, swagger_1.ApiQuery)(query));
    }
    if (param && Array.isArray(param)) {
        decorators.push(...param.map((opt) => (0, swagger_1.ApiParam)(opt)));
    }
    else if (param) {
        decorators.push((0, swagger_1.ApiParam)(param));
    }
    return (0, common_1.applyDecorators)(...decorators);
}
function defineRequestPaginationQuery(decorators) {
    decorators.push((0, swagger_1.ApiQuery)({ name: "page", type: Number, required: false, example: 1 }), (0, swagger_1.ApiQuery)({ name: "pageSize", type: Number, required: false, example: 10 }));
}
const ResponsePaginated = (model, { status, description }) => (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(dto_1.PaginationResponseDto, model), (0, swagger_1.ApiResponse)({
    status,
    description,
    schema: {
        allOf: [
            { $ref: (0, swagger_1.getSchemaPath)(dto_1.PaginationResponseDto) },
            {
                properties: {
                    data: {
                        type: "array",
                        items: { $ref: (0, swagger_1.getSchemaPath)(model) },
                    },
                },
            },
        ],
    },
}));
exports.ResponsePaginated = ResponsePaginated;
function addApiResponse(option, decorators) {
    if (option?.isPagination && option?.type) {
        decorators.push((0, exports.ResponsePaginated)(option.type, option));
    }
    else {
        decorators.push((0, swagger_1.ApiResponse)(option));
    }
}
//# sourceMappingURL=api-document.decorator.js.map