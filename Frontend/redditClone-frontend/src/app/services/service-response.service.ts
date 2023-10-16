export interface ServiceResponse<T> {
    data: T;
    success: boolean;
    message: string;
  }