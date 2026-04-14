import { CSSProperties } from 'react';
import classes from './skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
  borderRadius?: number | string;
  width?: number | string;
  height?: number | string;
}

export function Skeleton({ className, style, borderRadius, width, height }: SkeletonProps) {
  return (
    <div
      className={`${classes.container}${className ? ` ${className}` : ''}`}
      style={{ borderRadius, width, height, ...style }}
    >
      <div className={classes.shimmer} />
    </div>
  );
}
