import { Grid, GridCol, Group, Text } from '@mantine/core';
import ThemeNav from '@/components/sidebars/theme-nav/theme-nav';
import classes from './layout.module.scss';

export default function AdminThemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.adminThemeLayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Theme</Text>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <ThemeNav />
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>{children}</GridCol>
      </Grid>
    </div>
  );
}
