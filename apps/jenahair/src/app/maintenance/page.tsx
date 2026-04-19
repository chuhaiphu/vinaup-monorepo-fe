import { redirect } from 'next/navigation';
import { getAppConfigActionPublic } from '@/actions/app-config-action';
import { Center } from '@mantine/core';
import Image from 'next/image';
import classes from './page.module.scss';

export default async function MaintenancePage() {
  'use cache'
  const appConfigResponse = await getAppConfigActionPublic();
  const isMaintenanceMode = appConfigResponse.success ? appConfigResponse.data?.maintenanceMode : false;

  if (!isMaintenanceMode) {
    redirect('/');
  }

  return (
    <div className={classes.container}>
      <Center className={classes.center}>
        <Image
          src="/images/coming-soon.png"
          alt="Coming Soon"
          width={800}
          height={600}
          className={classes.image}
          priority
        />
      </Center>
    </div>
  );
}
