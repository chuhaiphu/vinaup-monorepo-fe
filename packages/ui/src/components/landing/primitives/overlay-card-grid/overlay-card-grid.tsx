'use client';

import { SimpleGrid } from '@mantine/core';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import { OverlayCard } from '@vinaup/ui/landing';
import classes from './overlay-card-grid.module.scss';

export interface OverlayCardItem {
    id: string | number;
    title: string;
    description?: string;
    image: string;
}

export interface OverlayCardGridProps {
    items: OverlayCardItem[];
    maxItems?: number;
}

export function OverlayCardGrid({ items, maxItems = 8 }: Readonly<OverlayCardGridProps>) {

    const renderCard = (item: OverlayCardItem) => (
        <OverlayCard
            title={item.title}
            description={item.description}
            src={item.image}
            classNames={{
                title: classes.overlayCardTitle,
                description: classes.overlayCardDescription,
            }}
        />
    );

    const displayItems = items.slice(0, maxItems);

    return (
        <>
            {/* 1. GIAO DIỆN PC */}
            <SimpleGrid cols={{ base: 1, md: 4 }} spacing="lg" visibleFrom="md">
                {displayItems.map((item) => (
                    <div key={item.id}>{renderCard(item)}</div>
                ))}
            </SimpleGrid>

            {/* 2. GIAO DIỆN MOBILE */}
            <Carousel
                slideSize="80%"
                slideGap="md"
                // emblaOptions={{
                //     align: 'start',
                // }}
                withControls={false}
                hiddenFrom="md"
                classNames={{
                    container: classes.carouselContainer,
                    viewport: classes.carouselViewport,
                }}
            >
                {displayItems.map((item) => (
                    <CarouselSlide key={item.id}>{renderCard(item)}</CarouselSlide>
                ))}
            </Carousel>
        </>
    );
}