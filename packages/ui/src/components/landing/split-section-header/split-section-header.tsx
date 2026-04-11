'use client';

import { Title, Text, Flex, TitleOrder } from '@mantine/core';
import classes from './split-section-header.module.scss';

interface SplitSectionHeaderProps {
  title: string;
  description?: string;
  order?: TitleOrder;
}

export function SplitSectionHeader({ title, description, order = 2 }: SplitSectionHeaderProps) {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }} // Mobile xếp dọc, Desktop xếp ngang
      align={{ base: 'flex-start', md: 'center' } as const} // Căn giữa theo chiều dọc trên Desktop
      justify="space-between"
      gap={{ base: 'sm', md: 'lg' }} // Khoảng cách giữa Title và Text
      className={classes.wrapper}
    >
      <Title order={order} className={classes.title}>
        {title}
      </Title>

      {description && (
        <Text className={classes.description}>
          {description}
        </Text>
      )}
    </Flex>
  );
}