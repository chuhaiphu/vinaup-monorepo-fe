import { Grid, GridCol, Group, Text } from "@mantine/core";
import classes from "./admin-setting-layout-content.module.scss";
import SettingNav from "@/components/sidebars/setting-nav/setting-nav";

interface AdminSettingLayoutContentProps {
  children: React.ReactNode;
}

export default function AdminSettingLayoutContent({ children }: AdminSettingLayoutContentProps) {
  return (
    <div className={classes.adminSettingLayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Settings</Text>
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <SettingNav />
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>{children}</GridCol>
      </Grid>
    </div>
  );
}
