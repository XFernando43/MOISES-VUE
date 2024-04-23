import { Meta } from './pagination';

export interface BaseResponse<T> {
  success: boolean;
  message: string | string[];
  data: T;
  meta?: Meta;
}