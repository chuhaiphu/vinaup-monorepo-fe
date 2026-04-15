import AdminTourDetailPageContent from '@/components/mains/admin-tour/admin-tour-detail-page-content/admin-tour-detail-page-content';
import { getTourByIdActionPrivate } from '@/actions/tour-action';
import { getAllTourCategoriesActionPublic } from '@/actions/tour-category-action';
import { Suspense } from 'react';

export default function AdminTourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentTourPromise = params.then((params) => getTourByIdActionPrivate(params.id));
  const tourCategoriesPromise = getAllTourCategoriesActionPublic();

  return (
    <Suspense>
      <AdminTourDetailPageContent
        currentTourPromise={currentTourPromise}
        tourCategoriesPromise={tourCategoriesPromise}
      />
    </Suspense>
  );
}
