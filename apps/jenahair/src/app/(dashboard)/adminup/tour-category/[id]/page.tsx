import AdminTourCategoryDetailPageContent from '@/components/mains/admin-tour/admin-tour-category-detail-page-content/admin-tour-category-detail-page-content';
import {
  getAllTourCategoriesActionPublic,
  getAvailableSortOrdersActionPrivate,
  getTourCategoryByIdActionPrivate,
} from '@/actions/tour-category-action';
import { Suspense } from 'react';

export default function AdminTourCategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentTourCategoryPromise = params.then((params) =>
    getTourCategoryByIdActionPrivate(params.id)
  );
  const tourCategoriesPromise = getAllTourCategoriesActionPublic();
  const availableSortOrdersPromise = currentTourCategoryPromise.then((res) =>
    getAvailableSortOrdersActionPrivate(res.data?.parent?.id || '')
  );

  return (
    <Suspense>
      <AdminTourCategoryDetailPageContent
        currentTourCategoryPromise={currentTourCategoryPromise}
        tourCategoriesPromise={tourCategoriesPromise}
        availableSortOrdersPromise={availableSortOrdersPromise}
      />
    </Suspense>
  );
}
