'use client';

import { incrementDiaryLikeActionPublic } from '@/actions/diary-action';
import { Group, Text, UnstyledButton } from '@mantine/core';
import { IoHeart } from 'react-icons/io5';
import { useState } from 'react';

type LikeDiaryButtonProps = {
  diaryId: string;
  likes: number;
};

export default function LikeDiaryButton({
  diaryId,
  likes: initialLikes,
}: LikeDiaryButtonProps) {
  const [likes, setLikes] = useState(initialLikes ?? 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const result = await incrementDiaryLikeActionPublic(diaryId);

      if (!result.success || typeof result.data !== 'boolean') {
        return;
      }

      setLikes((prev) => {
        const next = result.data ? prev + 1 : prev - 1;
        return next < 0 ? 0 : next;
      });
    } catch (error) {
      console.error('Failed to like diary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UnstyledButton onClick={handleLike} disabled={isLoading}>
      <Group gap={6}>
        <IoHeart color="var(--vinaup-amber)" size={18} />
        <Text fz={18} c={'white'}>
          {likes}
        </Text>
      </Group>
    </UnstyledButton>
  );
}
