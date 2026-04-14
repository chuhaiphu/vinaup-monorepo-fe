'use client';

import Marquee from 'react-fast-marquee';
import classes from './auto-scroll-carousel.module.scss';
import { Box } from '@mantine/core';
import type { ReactNode } from 'react';

interface AutoScrollCarouselProps {
    children: ReactNode;
    speed?: number;
    direction?: 'left' | 'right';
    pauseOnHover?: boolean;
    autoFill?: boolean;
}

export function AutoScrollCarousel({
    children,
    speed = 80,
    direction = 'right',
    pauseOnHover = false,
    autoFill = true,
}: AutoScrollCarouselProps) {
    return (
        <Box className={classes.wrapper}>
            <Marquee
                autoFill={autoFill}
                speed={speed}
                gradient={false}
                pauseOnHover={pauseOnHover}
                direction={direction}
            >
                {children}
            </Marquee>
        </Box>
    );
}
