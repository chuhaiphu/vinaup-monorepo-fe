import { ISmtpConfigResponse, IUpdateSmtpConfig } from "@/interfaces/smtp-config-interface";
import { apiPrivate } from "./_base";

export async function getSmtpConfigApiPrivate() {
  return apiPrivate<ISmtpConfigResponse>('/smtp-config/admin', {
    method: 'GET',
  });
}

export async function updateSmtpConfigApiPrivate(data: IUpdateSmtpConfig) {
  return apiPrivate<ISmtpConfigResponse>('/smtp-config/admin', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function testSmtpEmailApiPrivate(email: string) {
  return apiPrivate<{ success: boolean }>('/smtp-config/admin/test', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
