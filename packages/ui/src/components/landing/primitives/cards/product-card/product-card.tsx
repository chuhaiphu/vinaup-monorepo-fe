import { Card, Text, Group, Button, Box, CardSection } from '@mantine/core';
import Image from 'next/image';
import { FaRegClock } from 'react-icons/fa6';
import classes from './product-card.module.scss';
import Link from 'next/link';

export interface ProductCardProps {
  title: string;
  image: string;
  duration: string;
  price: string;
  currency: string;
  topLeftSection?: React.ReactNode;
  topRightSection?: React.ReactNode;
}

export function ProductCard({
  title,
  image,
  duration,
  price,
  currency,
  topLeftSection,
  topRightSection,
}: ProductCardProps) {
  return (
    <Card radius="lg" className={classes.card} shadow="sm" withBorder>
      {topLeftSection && (
        <div className={classes.topLeftSection}>{topLeftSection}</div>
      )}

      {topRightSection && (
        <div className={classes.topRightSection}>{topRightSection}</div>
      )}

      <CardSection className={classes.imageSection}>
        <div className={classes.imageWrapper}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={classes.image}
          />
        </div>
      </CardSection>

      <Box className={classes.content}>
        <Text className={classes.title} lineClamp={2} title={title}>
          {title}
        </Text>

        <Group justify="space-between" my={12} className={classes.details}>
          <Group gap={6}>
            <FaRegClock size={14} className={classes.clockIcon} />
            <Text className={classes.duration}>{duration}</Text>
          </Group>
          <Text className={classes.price}>
            <span className={classes.currency}>{currency}</span> {price}
          </Text>
        </Group>

        <Button
          fullWidth
          radius="md"
          className={classes.bookButton}
          component={Link}
          href="#"
        >
          Booking Now
        </Button>
      </Box>
    </Card>
  );
}
