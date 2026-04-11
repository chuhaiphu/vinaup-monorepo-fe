import { Card, Text, Group, Stack } from '@mantine/core';
import classes from './tour-item.module.scss';
import { formatPrice, renderDurationDays } from '@/utils/function-helpers';
import Image from 'next/image';

interface TourItemProps {
  item: {
    id: string;
    title: string;
    mainImageUrl: string | null;
    durationDays: number;
    price: number;
    discountPrice: number;
    endpoint: string;
  };
}

export default function TourItem({ item }: TourItemProps) {
  const renderPrice = (price: number, discountPrice: number) => {
    // Case 1: price === 0 -> Ask for Price
    if (price === 0) {
      return (
        <Group classNames={{ root: classes.price }} gap={'xs'}>
          <Text c={'#00E1FF'} fw={'bold'} className={classes.value} size="lg">
            Ask for Price
          </Text>
        </Group>
      );
    }

    // Case 2: Only price exists (discountPrice === 0) -> render price with main style
    if (discountPrice === 0) {
      return (
        <Group classNames={{ root: classes.price }} gap={'xs'}>
          <Text c={'#00E1FF'} className={classes.currency} pb={4} size="md">
            đ
          </Text>
          <Text c={'#00E1FF'} className={classes.value} size="lg">
            {formatPrice(price)}
          </Text>
        </Group>
      );
    }

    // Case 3: Both price and discountPrice exist -> price strikethrough, discountPrice as main
    return (
      <Group classNames={{ root: classes.price }} gap={'xs'}>
        <Text c={'#00E1FF'} className={classes.currency} pb={4} size="md">
          đ
        </Text>
        <Group gap={'xs'}>
          <Text c={'#00E1FF'} className={classes.value} size="lg">
            {formatPrice(discountPrice)}
          </Text>
          <Text td="line-through" c={'white'} className={classes.value} size="sm">
            {formatPrice(price)}
          </Text>
        </Group>
      </Group>
    );
  };

  return (
    <Card className={classes.tourItem} padding={0} bg={'transparent'}>
      <div className={classes.imageWrapper}>
        <Image
          src={item.mainImageUrl || '/images/image-placeholder.png'}
          alt={item.title}
          className={classes.image}
          fill
        />
      </div>

      <Stack className={classes.content} gap="xs" p="sm" pt={'lg'}>
        <Text
          className={classes.title}
          fw={'400'}
          c={'#00E1FF'}
          lineClamp={2}
          component="h3"
          fz={'lg'}
          styles={{ root: { lineHeight: 1.5, minHeight: '3em' } }}
        >
          {item.title}
        </Text>

        <Group justify="space-between" align="flex-start">
          <Stack gap={4}>
            <Text className={classes.label} size="sm" c={'#F9F9F9'}>
              Price from
            </Text>
            {renderPrice(item.price, item.discountPrice)}
          </Stack>

          <Stack gap={4} align="flex-end">
            <Text className={classes.label} size="sm" c={'#F9F9F9'}>
              Duration
            </Text>
            <Text className={classes.duration} size="lg">
              {renderDurationDays(item.durationDays)}
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
}
