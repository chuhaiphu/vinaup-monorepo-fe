'use client';

import { useEffect } from 'react';
import { incrementTourViewActionPublic } from '@/actions/tour-action';
import { incrementBlogViewActionPublic } from '@/actions/blog-action';

interface IncrementViewProps {
  tourId?: string;
  blogId?: string;
}

export default function IncrementView({ tourId, blogId }: IncrementViewProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        if (tourId) {
          await incrementTourViewActionPublic(tourId);
        } else if (blogId) {
          await incrementBlogViewActionPublic(blogId);
        }
      } catch (error) {
        // Silently fail - view increment is not critical
        console.error('Failed to increment view:', error);
      }
    };

    incrementView();
  }, [tourId, blogId]);

  return null;
}
