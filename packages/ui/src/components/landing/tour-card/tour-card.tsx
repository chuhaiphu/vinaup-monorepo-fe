import {
  Card,
  Text,
  Group,
  Button,
  Box,
  Badge,
  ActionIcon,
  CardSection,
} from '@mantine/core';
import Image from 'next/image';
import { FaRegClock, FaHeart } from 'react-icons/fa6';
import classes from './tour-card.module.scss';
import Link from 'next/link';

interface TourCardProps {
  title: string;
  image: string;
  duration: string;
  price: string;
  currency: string;
  badge?: string;
  isFavorite?: boolean;
}

export function TourCard({
  title,
  image,
  duration,
  price,
  currency,
  badge,
  isFavorite,
}: TourCardProps) {
  return (
    <Card radius="lg" className={classes.card} shadow="sm" withBorder>
      {badge && (
        <Badge className={classes.badge} radius="xl">
          {badge}
        </Badge>
      )}

      <ActionIcon
        className={classes.heartIcon}
        variant="white"
        radius="xl"
        aria-label="Add to favorites"
      >
        <FaHeart size={16} color={isFavorite ? 'var(--vinaup-red)' : '#ced4da'} />
      </ActionIcon>

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
