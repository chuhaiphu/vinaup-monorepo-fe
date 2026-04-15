import AdminPageDetailPageContent from '@/components/mains/admin-page-page/admin-page-detail-page-content/admin-page-detail-page-content';
import { getPageByIdActionPrivate } from '@/actions/page-action';
import { Suspense } from 'react';

export default function AdminPageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentPagePromise = params.then((params) => getPageByIdActionPrivate(params.id));

  return (
    <Suspense>
      <AdminPageDetailPageContent currentPagePromise={currentPagePromise} />
    </Suspense>
  );
}
