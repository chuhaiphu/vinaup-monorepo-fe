import { ISmtpConfigResponse, IUpdateSmtpConfig } from "@/interfaces/smtp-config-interface";
import { apiPrivate } from "./_base";

export async function getSmtpConfigApiPrivate() {
  return apiPrivate<ISmtpConfigResponse>('/admin/smtp-config', {
    method: 'GET',
  });
}

export async function updateSmtpConfigApiPrivate(data: IUpdateSmtpConfig) {
  return apiPrivate<ISmtpConfigResponse>('/admin/smtp-config', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function testSmtpEmailApiPrivate(email: string) {
  return apiPrivate<{ success: boolean }>('/admin/smtp-config/test', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
