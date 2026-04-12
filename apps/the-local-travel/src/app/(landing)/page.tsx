import { HeroCarousel } from '@vinaup/ui/landing';
import { HeroContent } from '@vinaup/ui/landing';
import { Container, Stack } from '@mantine/core';

import { StatsBanner } from '@vinaup/ui/landing';
import { SupplierSection } from '@vinaup/ui/landing';
import { TourTypes } from '@vinaup/ui/landing';
import { RecentlyPublished } from '@vinaup/ui/landing';
import { OurPartners } from '@vinaup/ui/landing';
import { TravelServices } from '@vinaup/ui/landing';

import { MOCK_SLIDES } from '@/mocks/hero-carousel-data';
import { SUPPLIER_DATA } from '@/mocks/suppiler-data';
import { MOCK_TOUR_TYPES } from '@/mocks/tour-types-data';
import { MOCK_RECENTLY_PUBLISHED } from '@/mocks/recently-published-data';
import { MOCK_PARTNERS } from '@/mocks/partners-data';
import { TRAVEL_SERVICES_DATA } from '@/mocks/travel-services-data';

export default function Home() {
  const STATS_DATA = [
    { end: 10, suffix: 'M+', label: 'Total Customers' },
    { end: 9, prefix: '0', suffix: '+', label: 'Year Of Experience' },
    { end: 12, suffix: 'K', label: 'Total Destinations' },
    { end: 5, decimals: 1, label: 'Average Rating' },
  ];

  return (
    <main>
      <HeroCarousel data={MOCK_SLIDES} height="70vh">
        <HeroContent />
      </HeroCarousel>

      <Container size={1232} pt="3rem">
        <Stack gap="3rem">
          <SupplierSection data={SUPPLIER_DATA} />
          <TourTypes data={MOCK_TOUR_TYPES} />
          <StatsBanner stats={STATS_DATA} />
          <RecentlyPublished data={MOCK_RECENTLY_PUBLISHED} />
          <TravelServices data={TRAVEL_SERVICES_DATA} youtubeEmbedUrl="..." />
          <OurPartners data={MOCK_PARTNERS} />
        </Stack>
      </Container>
    </main>
  );
}
