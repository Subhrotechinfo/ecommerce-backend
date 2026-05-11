import { HttpException } from "@nestjs/common";
import { HttpErrorResponseDto } from "../dto";
export declare class ServerException extends HttpException {
  constructor(response: HttpErrorResponseDto, status?: number);
}
//# sourceMappingURL=server.exception.d.ts.map
