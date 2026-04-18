import AdminMenuDetailPageContent from '@/components/mains/admin-menu/admin-menu-detail-page-content/admin-menu-detail-page-content';
import {
  getAllMenusActionPrivate,
  getAvailableSortOrdersActionPrivate,
  getMenuByIdActionPrivate,
} from '@/actions/menu-action';
import { Suspense } from 'react';

export default function AdminMenuDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentMenuPromise = params.then((params) => getMenuByIdActionPrivate(params.id));
  const menusPromise = getAllMenusActionPrivate();
  const availableSortOrdersPromise = currentMenuPromise.then((res) =>
    getAvailableSortOrdersActionPrivate(res.data?.parent?.id || '')
  );

  return (
    <Suspense>
      <AdminMenuDetailPageContent
        currentMenuPromise={currentMenuPromise}
        menusPromise={menusPromise}
        availableSortOrdersPromise={availableSortOrdersPromise}
      />
    </Suspense>
  );
}
