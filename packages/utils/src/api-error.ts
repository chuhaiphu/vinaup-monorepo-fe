export class ApiError extends Error {
  public statusCode: number;
  public error: string;

  constructor(message: string, error: string, statusCode: number) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }
}

export interface ParsedCookie {
  name: string;
  value: string;
  options: {
    maxAge?: number;
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    secure?: boolean;
  };
}
