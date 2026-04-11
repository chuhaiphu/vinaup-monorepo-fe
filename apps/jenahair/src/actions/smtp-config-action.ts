'use server';

import { revalidatePath } from 'next/cache';
import { ActionResponse } from '@/interfaces/_base-interface';
import {
  ISmtpConfigResponse,
  ICreateSmtpConfig,
  IUpdateSmtpConfig,
} from '@/interfaces/smtp-config-interface';
import { executeApi } from '@/actions/_base';
import {
  getSmtpConfigApiPrivate,
  updateSmtpConfigApiPrivate,
  testSmtpEmailApiPrivate,
} from '@/apis/smtp-config-apis';

export async function getSmtpConfigActionPrivate(): Promise<ActionResponse<ISmtpConfigResponse | null>> {
  const result = await executeApi(
    async () => getSmtpConfigApiPrivate()
  );
  return result as ActionResponse<ISmtpConfigResponse | null>;
}

export async function saveSmtpConfigActionPrivate(
  input: ICreateSmtpConfig
): Promise<ActionResponse<ISmtpConfigResponse>> {
  const result = await executeApi(
    async () => updateSmtpConfigApiPrivate(input)
  );
  revalidatePath('/adminup/settings', 'page');
  return result;
}

export async function updateSmtpConfigActionPrivate(
  id: string,
  input: IUpdateSmtpConfig
): Promise<ActionResponse<ISmtpConfigResponse>> {
  const result = await executeApi(
    async () => updateSmtpConfigApiPrivate(input)
  );
  revalidatePath('/adminup/settings', 'page');
  return result;
}

export async function hasSmtpConfigActionPrivate(): Promise<ActionResponse<boolean>> {
  const result = await executeApi(
    async () => getSmtpConfigApiPrivate()
  );
  return {
    success: result.success,
    data: result.success && result.data !== null,
    error: result.error,
  };
}

export async function sendTestEmailActionPrivate(email: string): Promise<ActionResponse<void>> {
  const result = await executeApi(
    async () => testSmtpEmailApiPrivate(email)
  );
  return {
    success: result.success && result.data?.success === true,
    error: result.error || (result.data?.success === false ? 'Failed to send test email' : undefined),
  };
}
