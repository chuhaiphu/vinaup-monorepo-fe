import { HeroCarousel } from '@vinaup/ui/landing';
import { Container, Stack } from '@mantine/core';
import { BrandIntroduction } from '@/components/brand-introduction/brand-introduction';
import { AutoScrollCarousel } from '../../../../../packages/ui/src/components/landing/primitives/carousels/auto-scroll-carousel/auto-scroll-carousel';
import { SalonServicesBanner } from '@/components/salon-services-banner/salon-services-banner';
import { SalonDiary } from '@/components/salon-diary/salon-diary';

// Import toàn bộ Mock Data ở đây
import { MOCK_SALON_SERVICES } from '@/mocks/salon-services';
import { MOCK_SLIDES } from '@/mocks/mock-slides';
import { MOCK_DIARY_POSTS } from '@/mocks/salon-diary';
import { CommitmentAndMedia } from '@/components/commitment-and-media/commitment-and-media';
import classes from './page.module.scss';
import { MOCK_MEDIA_DATA } from '@/mocks/commitment-media';

const PARTNER_BRANDS = ['Milbon', 'ATS', 'L\u2019Or\u00e9al', 'Olaplex', 'K\u00e9rastase'];

export default function Home() {
  return (
    <main>
      <HeroCarousel data={MOCK_SLIDES} overlayOpacity={0.2} height="70vh" />

      <Container size={1232} pt="3rem">
        <BrandIntroduction />
      </Container>

      <Stack gap="3rem" pt="3rem" >
        <AutoScrollCarousel>
          {PARTNER_BRANDS.map((brand, index) => (
            <div key={index} className={classes.brandItem}>
              {brand}
            </div>
          ))}
        </AutoScrollCarousel>

        <SalonServicesBanner
          imageSrc="/images/IntroImage.png"
          imageAlt="Jena Hair Certificate"
          services={MOCK_SALON_SERVICES}
        />

        <SalonDiary posts={MOCK_DIARY_POSTS} />

        <CommitmentAndMedia {...MOCK_MEDIA_DATA} />

      </Stack>
    </main>
  );
}