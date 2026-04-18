'use client';

import { getEmbeddedVideoUrl } from '@vinaup/utils';
import classes from './video-section.module.scss';
import { ActionIcon } from '@mantine/core';
import { useState } from 'react';
import { BsPlayBtnFill } from 'react-icons/bs';

interface VideoPlayerProps {
  url?: string;
  title?: string;
  height?: number | string;
  thumbnailUrl?: string;
}

export function VideoSection({
  url,
  title = 'Embedded Video',
  height,
  thumbnailUrl,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = getEmbeddedVideoUrl(url);

  if (!embedUrl) {
    return null;
  }

  const autoplayEmbedUrl = isPlaying
    ? embedUrl + (embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1')
    : embedUrl;

  return (
    <div 
      className={classes.videoContainer} 
      // style={{ height: typeof height === 'number' ? `${height}px` : height || '640px' }}
    >
      {!isPlaying && thumbnailUrl && (
        <div
          className={classes.thumbnail}
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
          onClick={() => setIsPlaying(true)}
        >
          <ActionIcon variant="transparent" size={72}>
            <BsPlayBtnFill size={72} color="red" />
          </ActionIcon>
        </div>
      )}
      {(isPlaying || !thumbnailUrl) && (
        <iframe
          loading="lazy"
          src={autoplayEmbedUrl}
          title={title}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}