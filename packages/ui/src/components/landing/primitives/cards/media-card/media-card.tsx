import { Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import classes from "./media-card.module.scss";

interface MediaCardProps {
  title: string;
  src: string;
  href?: string;
  height?: number | string;
  aspectRatio?: string;
  borderRadius?: string;
  priority?: boolean;
  variant?: "floating" | "banner";
}

export function MediaCard({
  title,
  src,
  href,
  height,
  aspectRatio,
  priority = false,
  borderRadius = "0.5rem",
  variant = "floating",
}: MediaCardProps) {
  const content = (
    <div
      className={classes.imageWrapper}
      style={{
        height: height || (aspectRatio ? "auto" : 320),
        aspectRatio,
        borderRadius,
      }}
    >
      <Image
        src={src}
        alt={title}
        className={classes.image}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {variant === "floating" ? (
        <Text className={classes.titleFloating}>{title}</Text>
      ) : (
        <div className={classes.titleBannerWrapper}>
          <Text className={classes.titleBanner}>{title}</Text>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href as Route} className={classes.linkWrapper}>
        {content}
      </Link>
    );
  }

  return content;
}
