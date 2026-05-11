export declare class PaginationQueryDto {
  page: number;
  pageSize: number;
}
export declare class PaginationMetadataResponseDto {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
}
export declare class PaginationResponseDto<T> {
  data: T[];
  pagination: PaginationMetadataResponseDto;
}
//# sourceMappingURL=pagination.dto.d.ts.map
