import { HeroCarousel } from '@vinaup/ui/landing';
import { HeroContent } from '@/components/sections/hero-content/hero-content';
import { Container, Stack } from '@mantine/core';

import { StatsBanner } from '@vinaup/ui/landing';
import { SupplierSection } from '@/components/sections/supplier-section/supplier-section';
import { TourTypes } from '@/components/sections/tour-types/tour-types';
import { RecentlyPublished } from '@/components/sections/recently-published/recently-published';
import { OurPartners } from '@/components/sections/our-partners/our-partners';
import { TravelServices } from '@/components/sections/travel-services/travel-services';

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
      <HeroCarousel data={MOCK_SLIDES} height="70vh" overlayOpacity={0.3}>
        <HeroContent />
      </HeroCarousel>

      <Container size={'xl'} pt="3rem">
        <Stack gap="3rem">
          <SupplierSection data={SUPPLIER_DATA} />
          <TourTypes data={MOCK_TOUR_TYPES} />
          <StatsBanner stats={STATS_DATA} />
          <RecentlyPublished data={MOCK_RECENTLY_PUBLISHED} />
          <TravelServices
            data={TRAVEL_SERVICES_DATA}
            youtubeEmbedUrl="https://www.youtube.com/embed/f8QDvuGLVZw"
            youtubeVideoTitle="Da Nang Vietnam | 3 Days Itinerary | Things to do in Da Nang | Da Nang Travel Guide |Trip to Hoi An"
          />
          <OurPartners data={MOCK_PARTNERS} />
        </Stack>
      </Container>
    </main>
  );
}
