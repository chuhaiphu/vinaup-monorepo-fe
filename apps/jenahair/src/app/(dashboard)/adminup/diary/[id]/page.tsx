import AdminDiaryDetailPageContent from '@/components/mains/admin-diary/admin-diary-detail-page-content/admin-diary-detail-page-content';
import { getDiaryByIdActionPrivate } from '@/actions/diary-action';
import { getAllDiaryCategoriesActionPrivate } from '@/actions/diary-category-action';
import { Suspense } from 'react';

export default function AdminDiaryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentDiaryPromise = params.then((params) =>
    getDiaryByIdActionPrivate(params.id)
  );
  const diaryCategoriesPromise = getAllDiaryCategoriesActionPrivate();

  return (
    <Suspense>
      <AdminDiaryDetailPageContent
        currentDiaryPromise={currentDiaryPromise}
        diaryCategoriesPromise={diaryCategoriesPromise}
      />
    </Suspense>
  );
}
