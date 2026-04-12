
import { Box, SimpleGrid } from '@mantine/core';
import { SectionHeader } from '../../primitives/section-header/section-header';
import { OverlayCard, OverlayCardProps } from '../../primitives/cards/overlay-card/overlay-card';

interface SupplierSectionProps {
  data: OverlayCardProps[];
}

export function SupplierSection({ data }: SupplierSectionProps) {
  return (
    <Box component="section">
      {/* Tái sử dụng Section Header */}
      <SectionHeader
        title="Vietnam Travel Supplier"
        description="Providing information about local tourism services in Vietnam: Tours, restaurants, attractions... recommended directly by sales staff from the providers."
        order={1} // h1
      />

      {/* Lưới Grid: Mobile 1 cột, Tablet 2 cột, Desktop 4 cột */}
      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={{ base: 'xs', lg: 'lg' }}>
        {data.map((item, index) => (
          <OverlayCard key={index} {...item} />
        ))}
      </SimpleGrid>
    </Box>
  );
}export type { OverlayCardProps } from '../../primitives/cards/overlay-card/overlay-card';
