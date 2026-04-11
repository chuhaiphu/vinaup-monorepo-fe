import { Center } from '@mantine/core';
import Image from 'next/image';
import classes from './maintenance-page-content.module.scss';

export default function MaintenancePageContent() {
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
