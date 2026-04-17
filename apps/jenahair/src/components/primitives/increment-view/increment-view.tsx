'use client';

import { useEffect } from 'react';
import { incrementTourViewActionPublic } from '@/actions/tour-action';
import { incrementBlogViewActionPublic } from '@/actions/blog-action';
import { incrementDiaryViewActionPublic } from '@/actions/diary-action';

interface IncrementViewProps {
  tourId?: string;
  blogId?: string;
  diaryId?: string;
}

export default function IncrementView({
  tourId,
  blogId,
  diaryId,
}: IncrementViewProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        if (tourId) {
          await incrementTourViewActionPublic(tourId);
        } else if (blogId) {
          await incrementBlogViewActionPublic(blogId);
        } else if (diaryId) {
          await incrementDiaryViewActionPublic(diaryId);
        }
      } catch (error) {
        // Silently fail - view increment is not critical
        console.error('Failed to increment view:', error);
      }
    };

    incrementView();
  }, [tourId, blogId, diaryId]);

  return null;
}
