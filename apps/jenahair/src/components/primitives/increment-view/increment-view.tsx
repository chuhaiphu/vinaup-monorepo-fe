'use client';

import { useEffect } from 'react';
import { incrementBlogViewActionPublic } from '@/actions/blog-action';
import { incrementDiaryViewActionPublic } from '@/actions/diary-action';

interface IncrementViewProps {
  blogId?: string;
  diaryId?: string;
}

export default function IncrementView({
  blogId,
  diaryId,
}: IncrementViewProps) {
  useEffect(() => {
    const incrementView = async () => {
      try {
        if (blogId) {
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
  }, [blogId, diaryId]);

  return null;
}
