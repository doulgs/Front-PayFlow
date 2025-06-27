export interface ResponseDTO<T> {
  isValid: boolean;
  msg: string;
  data: T | null;
}
