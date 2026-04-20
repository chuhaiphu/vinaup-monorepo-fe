import { AutoScrollCarousel } from '@vinaup/ui/landing';
import { getMarqueeActionPublic } from '@/actions/theme-config-action';
import classes from './marquee-slider.module.scss';
import Image from 'next/image';

export async function MarqueeSlider() {
  'use cache';
  const result = await getMarqueeActionPublic();
  const slides = result.data?.value ?? [];

  if (slides.length === 0) return null;
  const renderSlide = (slide: (typeof slides)[number]) => {
    if (slide.imageUrl) {
      return (
        <div key={slide.id} className={classes.item}>
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            className={classes.image}
            width={240}
            height={120}
          />
        </div>
      );
    } else if (slide.title && slide.title.trim() !== '') {
      return (
        <div key={slide.id} className={classes.item}>
          <span className={classes.title}>{slide.title}</span>
        </div>
      );
    }
    return null;
  };
  return (
    <AutoScrollCarousel>
      {slides.map((slide) => renderSlide(slide))}
    </AutoScrollCarousel>
  );
}
