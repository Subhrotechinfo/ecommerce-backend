import { ValidationError } from "class-validator";
import { ServerException } from "../exceptions";
export declare function formatValidationErrors(
  errors: ValidationError[],
): Record<string, any>;
export declare function classValidatorExceptionFactory(
  errors: ValidationError[],
): ServerException;
//# sourceMappingURL=validation.util.d.ts.map
