'use client';

import { ActionIcon, Group, Text, UnstyledButton } from "@mantine/core";
import { MdOutlineFileCopy } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { ImHeart } from "react-icons/im";
import { VinaupNetworkHubIcon as NetworkHubIcon } from '@vinaup/ui/cores';
import { useState } from "react";
import { incrementTourLikeActionPublic } from "@/actions/tour-action";
import { incrementBlogLikeActionPublic } from "@/actions/blog-action";

interface SocialTabProps {
  tourId?: string;
  blogId?: string;
  likes: number;
  views: number;
  url: string;
}

export default function SocialTab({ tourId, blogId, likes: initialLikes, views, url }: SocialTabProps) {
  const [likes, setLikes] = useState(initialLikes ?? 0);

  // Ensure views is a valid number
  const validViews = views ?? 0;

  const handleShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
  }

  const handleLike = async () => {
    try {
      if (tourId) {
        const result = await incrementTourLikeActionPublic(tourId);
        if (result.success && result.data) {
          setLikes(prev => prev + 1);
        }
      } else if (blogId) {
        const result = await incrementBlogLikeActionPublic(blogId);
        if (result.success && result.data) {
          setLikes(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Failed to like:', error);
    }
  }

  const formatNumber = (num: number | null | undefined): string => {
    // Handle null, undefined, or NaN
    if (num == null || isNaN(num)) {
      return '00';
    }

    const validNum = Number(num);
    if (validNum < 1000) {
      return validNum.toString().padStart(2, '0');
    }
    if (validNum < 1000000) {
      return (validNum / 1000).toFixed(1) + 'K';
    }
    return (validNum / 1000000).toFixed(1) + 'M';
  }

  return (
    <Group gap={'xl'}>
      <Group gap={4}>
        <MdOutlineFileCopy size={18} color="#00E1FF" />
        <UnstyledButton c={'white'} fz={15} onClick={handleCopyLink}>
          Copy Link
        </UnstyledButton>
      </Group>
      <Group gap={3}>
        <ActionIcon
          variant="transparent"
          onClick={handleShare}
        >
          <NetworkHubIcon fill="#00E1FF" size={18} />
        </ActionIcon>
        <UnstyledButton onClick={handleShare} c={'white'} fz={15}>
          Share
        </UnstyledButton>
      </Group>
      <Group gap={4}>
        <ActionIcon
          variant="transparent"
          onClick={handleLike}
        >
          <ImHeart size={18} color="#00E1FF" />
        </ActionIcon>
        <Text c={'white'} fz={15}>{formatNumber(likes)}</Text>
      </Group>
      <Group gap={4}>
        <FaRegEye size={18} color="white" />
        <Text c={'white'} fz={15}>{formatNumber(validViews)}</Text>
      </Group>
    </Group>
  );
}

