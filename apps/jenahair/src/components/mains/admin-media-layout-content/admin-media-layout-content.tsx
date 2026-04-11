import { Group, Text } from "@mantine/core";
import classes from "./admin-media-layout-content.module.scss";
import AdminMediaLayoutContentContainer from "./admin-media-layout-content-container/admin-media-layout-content-container";

export default function AdminMediaLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.adminMediaPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Media</Text>
      </Group>
      <div className={classes.tabsWrapper}>
        <AdminMediaLayoutContentContainer>
          {children}
        </AdminMediaLayoutContentContainer>
      </div>
    </div>
  );
}