'use client';

import { incrementBlogLikeActionPublic } from '@/actions/blog-action';
import { Group, Text, UnstyledButton } from '@mantine/core';
import { IoHeart } from 'react-icons/io5';
import { useState } from 'react';

type LikeBlogButtonProps = {
  blogId: string;
  likes: number;
};

export default function LikeBlogButton({
  blogId,
  likes: initialLikes,
}: LikeBlogButtonProps) {
  const [likes, setLikes] = useState(initialLikes ?? 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    setIsLoading(true);
    try {
      const result = await incrementBlogLikeActionPublic(blogId);

      if (!result.success || typeof result.data !== 'boolean') {
        return;
      }

      setLikes((prev) => {
        const next = result.data ? prev + 1 : prev - 1;
        return next < 0 ? 0 : next;
      });
    } catch (error) {
      console.error('Failed to like blog:', error);
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
