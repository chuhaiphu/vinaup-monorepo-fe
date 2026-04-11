import AdminSectionUIDetailPageContent from '@/components/mains/admin-section-ui-detail-page-content/admin-section-ui-detail-page-content';
import { Suspense } from 'react';

export default async function AdminSectionUIPage() {
  return (
    <Suspense>
      <AdminSectionUIDetailPageContent />
    </Suspense>
  );
}
