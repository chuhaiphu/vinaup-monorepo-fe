
import { Title, Text, Box } from '@mantine/core';
import Image from 'next/image';
import classes from './overlay-card.module.scss';
export interface OverlayCardProps {
  title: string;
  description: string;
  src: string;
}

export function OverlayCard({ title, description, src }: OverlayCardProps) {
  return (
    <Box component="article" className={classes.card}>
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{ objectFit: 'cover' }}
        className={classes.image}
      />

      {/* Overlay mờ tối để chữ nổi bật hơn trên nền ảnh */}
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Title order={3} className={classes.title}>{title}</Title>
        <Text className={classes.description}>{description}</Text>
      </div>
    </Box>
  );
}