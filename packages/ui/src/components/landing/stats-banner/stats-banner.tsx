'use client';

import { Box, Text, SimpleGrid } from '@mantine/core';
import CountUp from 'react-countup';
import classes from './stats-banner.module.scss';
import React from 'react';

export interface StatItem {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export interface StatsBannerProps {
  stats: StatItem[];
}

export function StatsBanner({ stats }: Readonly<StatsBannerProps>) {
  return (
    <Box component="section" className={classes.wrapper}>
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={0} className={classes.grid}>
        {stats.map((stat, index) => (
          <Box key={index} className={classes.statItem}>
            <Text className={classes.value}>
              <CountUp
                end={stat.end}
                suffix={stat.suffix}
                prefix={stat.prefix}
                decimals={stat.decimals || 0}
                duration={2.5}
                enableScrollSpy     // Kích hoạt tính năng: Khi cuộn chuột tới mới bắt đầu chạy
                scrollSpyOnce       // Chỉ chạy 1 lần duy nhất để không gây rối mắt
              />
            </Text>

            <Text className={classes.label}>{stat.label}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}