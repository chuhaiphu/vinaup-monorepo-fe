'use client';

import {
  Container,
  createTheme,
  MantineProvider,
  NavLink
} from '@mantine/core';
import { ReactNode } from 'react';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/vi';
import { Notifications } from '@mantine/notifications';

interface MantineConfigProviderContainerProps {
  children: ReactNode;
}

export default function MantineConfigProviderContainer({
  children,
}: Readonly<MantineConfigProviderContainerProps>) {
  const theme = createTheme({
    components: {
      Container: Container.extend({
        vars: (_, { size }) => {
          if (size === 'xl') {
            return {
              root: {
                '--container-size': '1440px',
              },
            }
          }
          return { root: {} }
        },
      }),
      NavLink: NavLink.extend({
        vars: () => ({
          root: {},
          children: {
            '--nl-offset': '0',
          },
        }),
        styles: {},
      }),
    },
  });

  return (
    <MantineProvider theme={theme} classNamesPrefix="vinaup">
      <Notifications />
      <DatesProvider
        settings={{
          locale: 'vi',
          firstDayOfWeek: 1,
          weekendDays: [0, 6],
        }}
      >
        {children}
      </DatesProvider>
    </MantineProvider>
  );
}
