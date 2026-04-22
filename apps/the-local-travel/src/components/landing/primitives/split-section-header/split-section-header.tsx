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
      direction={{ base: 'column', md: 'row' }}
      align={{ base: 'flex-start', md: 'center' } as const}
      justify="space-between"
      gap={{ base: 'sm', md: 'lg' }}
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
