'use client';

import { Container, createTheme, MantineProvider, NavLink } from '@mantine/core';
import { ReactNode } from 'react';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/vi';
import { Notifications } from '@mantine/notifications';

interface MantineConfigProviderContainerProps {
  children: ReactNode;
}

const CONTAINER_SIZES: Record<string, number> = {
  lg: 992,
  xl: 1232,
};

export default function MantineConfigProviderContainer({
  children,
}: Readonly<MantineConfigProviderContainerProps>) {
  const theme = createTheme({
    components: {
      Container: Container.extend({
        vars: (_, { size }) => {
          if (size && CONTAINER_SIZES[size]) {
            return {
              root: {
                '--container-size': `${CONTAINER_SIZES[size]}px`,
              },
            };
          }

          return { root: {} };
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
