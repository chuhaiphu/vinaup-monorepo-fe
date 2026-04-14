import { Grid, GridCol, Group, Text } from '@mantine/core';
import { Suspense } from 'react';
import { getAllMenusActionPrivate } from '@/actions/menu-action';
import MenuNav from '@/components/sidebars/menu-nav/menu-nav';
import MenuNavSkeleton from '@/components/sidebars/menu-nav/menu-nav-skeleton';
import CreateMenuAction from '@/components/mains/admin-menu/create-menu-action/create-menu-action';
import classes from './layout.module.scss';

export default async function AdminMenuLayout({ children }: { children: React.ReactNode }) {
  const menusDataPromise = getAllMenusActionPrivate();

  return (
    <div className={classes.adminMenuLayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Menu</Text>
        <CreateMenuAction />
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <Suspense fallback={<MenuNavSkeleton />}>
            <MenuNav menusDataPromise={menusDataPromise} />
          </Suspense>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>{children}</GridCol>
      </Grid>
    </div>
  );
}
