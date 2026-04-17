import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';

import { getMeActionPrivate } from '@/actions/auth-action';
import AdminLayoutContent from '@/components/mains/admin-layout-content/admin-layout-content';
import { Suspense } from 'react';

export default async function AdminLayoutRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense>
      <AdminLayoutContent userDataPromise={userDataPromise}>
        {children}
      </AdminLayoutContent>
    </Suspense>
  );
}
