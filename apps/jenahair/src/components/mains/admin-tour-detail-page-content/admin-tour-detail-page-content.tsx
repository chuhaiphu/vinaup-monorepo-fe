import { getTourByIdActionPrivate } from '@/actions/tour-action';
import { getAllTourCategoriesActionPublic } from '@/actions/tour-category-action';
import { getMeActionPrivate } from '@/actions/auth-action';
import { redirect } from 'next/navigation';
import AdminTourDetailPageContentContainer from './admin-tour-detail-page-content-container/admin-tour-detail-page-content-container';

interface AdminTourDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTourDetailPageContent({
  params,
}: AdminTourDetailPageContentProps) {
  const { id } = await params;
  const meResult = await getMeActionPrivate();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  const [currentTourResponse, tourCategoriesResponse] = await Promise.all([
    getTourByIdActionPrivate(id),
    getAllTourCategoriesActionPublic(),
  ]);

  if (!currentTourResponse.success || !currentTourResponse.data) {
    return <div>Tour not found</div>;
  }

  return (
    <AdminTourDetailPageContentContainer
      currentTourData={currentTourResponse.data}
      tourCategoriesData={tourCategoriesResponse.data ?? []}
      userData={meResult.data}
    />
  );
}
