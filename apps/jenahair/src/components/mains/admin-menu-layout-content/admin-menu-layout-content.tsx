import { getAllMenusActionPrivate } from "@/actions/menu-action";
import AdminMenuLayoutContentContainer from "./admin-menu-layout-content-container/admin-menu-layout-content-container";
import classes from "./admin-menu-layout-content.module.scss";

interface AdminMenuLayoutContentProps {
  children: React.ReactNode;
}

export default async function AdminMenuLayoutContent({ children }: AdminMenuLayoutContentProps) {
  const menusData = await getAllMenusActionPrivate();

  return (
    <div className={classes.adminMenuLayoutRoot}>
      <AdminMenuLayoutContentContainer
        menusData={menusData?.data ?? []}
      >
        {children}
      </AdminMenuLayoutContentContainer>
    </div>
  );
}
