export interface HttpResponse<T> {
  data?: T;
  error?: string;
  message: string;
  statusCode: number;
}

export type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};