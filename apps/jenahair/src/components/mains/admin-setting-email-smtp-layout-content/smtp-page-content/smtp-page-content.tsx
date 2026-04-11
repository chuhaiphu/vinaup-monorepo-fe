import { getSmtpConfigActionPrivate } from '@/actions/smtp-config-action';
import { getMeActionPrivate } from '@/actions/auth-action';
import { redirect } from 'next/navigation';
import SmtpPageContentContainer from './smtp-page-content-container/smtp-page-content-container';

export default async function SmtpPageContent() {
  const response = await getSmtpConfigActionPrivate();
  const smtpConfig = response.data ?? null;
  const meResult = await getMeActionPrivate();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  return (
    <SmtpPageContentContainer smtpConfig={smtpConfig} userData={meResult.data} />
  );
}
