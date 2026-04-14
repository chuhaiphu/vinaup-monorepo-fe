import { getSmtpConfigActionPrivate } from '@/actions/smtp-config-action';
import { Suspense } from 'react';
import SmtpPageContent from '@/components/mains/admin-settings/admin-setting-email-smtp-layout-content/smtp-page-content/smtp-page-content';
import SmtpPageContentSkeleton from '@/components/mains/admin-settings/admin-setting-email-smtp-layout-content/smtp-page-content/smtp-page-content-skeleton';

export default async function EmailSmtpPage() {
  const smtpConfigPromise = getSmtpConfigActionPrivate();

  return (
    <Suspense fallback={<SmtpPageContentSkeleton />}>
      <SmtpPageContent smtpConfigPromise={smtpConfigPromise} />
    </Suspense>
  );
}
