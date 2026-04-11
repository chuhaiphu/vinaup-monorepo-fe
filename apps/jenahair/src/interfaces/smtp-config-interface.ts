export interface ISmtpConfigResponse {
  id: string;
  host: string;
  port: number;
  secure: boolean;
  username: string;
  fromName: string;
  fromEmail: string;
  receiveEmail: string | null;
  updatedAt: Date;
}

export interface ISmtpConfigInternalResponse extends ISmtpConfigResponse {
  password: string;
}

export interface ICreateSmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromName: string;
  fromEmail: string;
  receiveEmail?: string | null;
}

export type IUpdateSmtpConfig = Partial<ICreateSmtpConfig>