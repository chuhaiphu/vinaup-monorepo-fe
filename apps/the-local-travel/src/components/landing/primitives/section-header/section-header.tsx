import { Title, Text, Stack, TitleOrder } from '@mantine/core';
import classes from './section-header.module.scss';

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  order?: TitleOrder;
}

export function SectionHeader({ title, description, align = 'center', order = 1 }: SectionHeaderProps) {
  const alignmentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  return (
    <Stack
      align={alignmentMap[align]}
      ta={align}
      gap="xs"
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
    </Stack>
  );
}
