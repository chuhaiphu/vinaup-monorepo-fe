import { getAllTourCategoriesActionPublic } from '@/actions/tour-category-action';
import AdminTourCategoryLayoutContentContainer from './admin-tour-category-layout-content-container/admin-tour-category-layout-content-container';
import classes from './admin-tour-category-layout-content.module.scss';

interface AdminTourCategoryLayoutContentProps {
  children: React.ReactNode;
}

export default async function AdminTourCategoryLayoutContent({
  children,
}: AdminTourCategoryLayoutContentProps) {
  const tourCategoriesData = await getAllTourCategoriesActionPublic();

  return (
    <div className={classes.adminTourCategoryLayoutRoot}>
      <AdminTourCategoryLayoutContentContainer
        tourCategoriesData={tourCategoriesData?.data ?? []}
      >
        {children}
      </AdminTourCategoryLayoutContentContainer>
    </div>
  );
}
