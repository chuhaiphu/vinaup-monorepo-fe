import SmtpPageContent from "@/components/mains/admin-setting-email-smtp-layout-content/smtp-page-content/smtp-page-content";
import { Loader } from "@mantine/core";
import { Suspense } from "react";

export default async function EmailSmtpPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SmtpPageContent />
    </Suspense>
  );
}