import { HeroCarousel } from '@vinaup/ui/landing';
import { Container, Stack } from '@mantine/core';
import { BrandIntroduction } from '@/components/sections/brand-introduction/brand-introduction';
import { MarqueeSlider } from '@/components/sections/marquee-slider/marquee-slider';
import { SalonServicesBanner } from '@/components/sections/salon-services-banner/salon-services-banner';
import { SalonDiarySection } from '@/components/sections/salon-diary-section/salon-diary-section';
import { MOCK_SALON_SERVICES } from '@/mocks/salon-services';
import { MOCK_SLIDES } from '@/mocks/mock-slides';
import { SalonVideoAndBlogsShowcase } from '@/components/sections/salon-video-and-blogs-showcase/salon-video-and-blogs-showcase';

export default function Home() {
  return (
    <div>

      <Container size={'xl'}>
        <Stack gap="3rem">
          <HeroCarousel data={MOCK_SLIDES} overlayOpacity={0.2} height="70vh" borderRadius={20} />
          <BrandIntroduction />
        </Stack>
      </Container>

      <Stack gap="3rem" pt="3rem">
        <MarqueeSlider />

        <SalonServicesBanner
          imageSrc="/images/IntroImage.png"
          imageAlt="Jena Hair Certificate"
          services={MOCK_SALON_SERVICES}
        />

        <SalonDiarySection />

        <SalonVideoAndBlogsShowcase />
      </Stack>
    </div>
  );
}
