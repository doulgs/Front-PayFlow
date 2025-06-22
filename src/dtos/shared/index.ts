export interface ResponseDTO<T> {
  isValid: boolean;
  msg: string;
  data: T | null;
}

export interface PaginationResponseDTO<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage?: number;
  previousPage?: number;
  firstPage?: number;
  lastPage?: number;
  from: number;
  to: number;
}
