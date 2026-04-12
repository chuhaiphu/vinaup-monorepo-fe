'use client';

import {
  Box,
  Group,
  Title,
  ActionIcon,
  Button,
  Text,
  SimpleGrid,
  UnstyledButton,
  Badge,
} from '@mantine/core';
import { FaFilter, FaArrowLeft, FaArrowRight, FaHeart } from 'react-icons/fa6';
import Image from 'next/image';
import classes from './recently-published.module.scss';
import { ProductCard } from '../../primitives/cards/product-card/product-card';
import Link from 'next/link';

interface TourItem {
  id: number;
  title: string;
  image: string;
  duration: string;
  price: string;
  currency: string;
  badge?: string;
  isFavorite?: boolean;
}

interface RecentlyPublishedProps {
  data: TourItem[];
}

export function RecentlyPublished({ data }: RecentlyPublishedProps) {
  return (
    <Box component="section" className={classes.wrapper}>
      {/* HEADER SECTION */}
      <Box mb={{ base: '0.5rem', sm: '1rem' }} className={classes.headerContainer}>
        {/* Hàng 1: Tiêu đề */}
        <Group gap="sm" className={classes.titleRow}>
          <Image
            src="/favicon.ico" // Thay thế bằng logo thực tế, hoặc xoá nếu không muốn icon
            alt="icon"
            width={50}
            height={50}
            className={classes.titleIcon}
            onError={(e) => {
              // phòng trường hợp không có ảnh
              e.currentTarget.style.display = 'none';
            }}
          />
          <Title order={2} className={classes.title}>
            Recently published tours
          </Title>
        </Group>

        {/* Hàng 2: Controls thanh điều hướng */}
        <Group
          justify="space-between"
          align="center"
          className={classes.controlRow}
        >
          <Group gap="lg" className={classes.filterGroup}>
            <Button
              variant="default"
              leftSection={<FaFilter size={14} />}
              radius="md"
              className={classes.filterButton}
            >
              Filter
            </Button>

            <Group gap="md" className={classes.categories}>
              <UnstyledButton className={classes.categoryActive}>
                Ha Long
              </UnstyledButton>
              <UnstyledButton className={classes.category}>Ha Noi</UnstyledButton>
              <UnstyledButton className={classes.category}>
                Ninh Binh
              </UnstyledButton>
            </Group>
          </Group>

          <Group gap="sm" className={classes.rightControls}>
            <Text component={Link} href="#" className={classes.viewAllText}>
              View all
            </Text>
            <ActionIcon
              variant="default"
              radius="xl"
              size="lg"
              className={classes.arrowBtn}
            >
              <FaArrowLeft size={16} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              radius="xl"
              size="lg"
              className={classes.arrowBtnActive}
            >
              <FaArrowRight size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Box>

      {/* GRID NHỮNG TOUR CARDS CHÍNH NẰM DƯỚI ĐÂY */}
      <SimpleGrid
        cols={{ base: 2, sm: 3, md: 3, lg: 4 }}
        spacing={{ base: 'xs', sm: 'lg' }}
        verticalSpacing={{ base: 'xs', sm: 'lg' }}
      >
        {data.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            image={item.image}
            duration={item.duration}
            price={item.price}
            currency={item.currency}
            topLeftSection={
              item.badge ? (
                <Badge
                  radius="md"
                  color="gray"
                  variant="white"
                  className={classes.badgeItem}
                >
                  {item.badge}
                </Badge>
              ) : undefined
            }
            topRightSection={
              <ActionIcon
                variant="white"
                radius="xl"
                aria-label="Add to favorites"
                className={classes.heartIconItem}
              >
                <FaHeart
                  size={16}
                  color={item.isFavorite ? 'var(--vinaup-red, red)' : '#ced4da'}
                />
              </ActionIcon>
            }
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
