import {
  getAllTourCategoriesActionPublic,
  getAvailableSortOrdersActionPrivate,
  getTourCategoryByIdActionPrivate,
} from '@/actions/tour-category-action';
import { notFound } from 'next/navigation';
import AdminTourCategoryDetailPageContentContainer from './admin-tour-category-detail-page-content-container/admin-tour-category-detail-page-content-container';

interface AdminTourCategoryDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTourCategoryDetailPageContent({
  params,
}: AdminTourCategoryDetailPageContentProps) {
  const { id } = await params;

  const [currentTourCategoryResponse, tourCategoriesResponse] = await Promise.all([
    getTourCategoryByIdActionPrivate(id),
    getAllTourCategoriesActionPublic(),
  ]);
  const availableSortOrdersResponse = await getAvailableSortOrdersActionPrivate(
    currentTourCategoryResponse.data?.parent?.id || ''
  );

  if (!currentTourCategoryResponse.success || !currentTourCategoryResponse.data) {
    notFound();
  }

  return (
    <AdminTourCategoryDetailPageContentContainer
      currentTourCategory={currentTourCategoryResponse.data}
      tourCategoriesData={tourCategoriesResponse.data ?? []}
      availableSortOrdersData={availableSortOrdersResponse.data ?? []}
    />
  );
}
