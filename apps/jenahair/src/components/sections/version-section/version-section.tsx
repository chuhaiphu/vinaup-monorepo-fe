import { Group } from '@mantine/core';
import classes from './version-section.module.scss';
import { VinaupLogoAlternative as LogoAlternative } from '@vinaup/ui/cores';
import Link from 'next/link';

const version = process.env.NEXT_PUBLIC_VERSION;

export function VersionSection() {
  return (
    <div className={classes.versionSectionRoot}>
      <Group gap={8}>
        <Link href="https://vinaup.net" target="_blank" rel="noopener noreferrer" className={classes.versionText}>
          {version}VinaUp 1.1
        </Link>
        <LogoAlternative />
      </Group>
    </div>
  );
}
