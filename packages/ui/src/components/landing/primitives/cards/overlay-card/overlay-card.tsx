
import { Title, Text, Box } from '@mantine/core';
import Image from 'next/image';
import classes from './overlay-card.module.scss';
export interface OverlayCardProps {
  title: string;
  description?: string;
  src: string;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    root?: string;
    image?: string;
    overlay?: string;
    content?: string;
    title?: string;
    description?: string;
  };
}

export function OverlayCard({ 
  title, 
  description, 
  src,
  className,
  style,
  classNames = {}
}: OverlayCardProps) {
  return (
    <Box component="article" className={`${classes.card} ${className || ''} ${classNames.root || ''}`} style={style}>
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        style={{ objectFit: 'cover' }}
        className={`${classes.image} ${classNames.image || ''}`}
      />

      {/* Overlay mờ tối để chữ nổi bật hơn trên nền ảnh */}
      <div className={`${classes.overlay} ${classNames.overlay || ''}`} />

      <div className={`${classes.content} ${classNames.content || ''}`}>
        <Title order={3} className={`${classes.title} ${classNames.title || ''}`}>{title}</Title>
        <Text className={`${classes.description} ${classNames.description || ''}`}>{description}</Text>
      </div>
    </Box>
  );
}