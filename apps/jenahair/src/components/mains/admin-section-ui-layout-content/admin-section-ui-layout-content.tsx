import AdminSectionUILayoutContentContainer from './admin-section-ui-layout-content-container/admin-section-ui-layout-content-container';
import classes from './admin-section-ui-layout-content.module.scss';

interface AdminSectionUILayoutContentProps {
  children: React.ReactNode;
}

export default async function AdminSectionUILayoutContent({
  children,
}: AdminSectionUILayoutContentProps) {
  return (
    <div className={classes.adminSectionUILayoutRoot}>
      <AdminSectionUILayoutContentContainer>
        {children}
      </AdminSectionUILayoutContentContainer>
    </div>
  );
}
