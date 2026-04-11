 'use client';

import Marquee from 'react-fast-marquee';
import classes from './auto-scroll-carousel.module.scss';
import Image from 'next/image';

export function AutoScrollCarousel() {
  return (
    <div className={classes.landingCarouselRoot}>
      <Marquee pauseOnHover={true} gradient={false} speed={80}>
        <div className={classes.slideWrapper}>
          <Image
            fill
            src="/images/vietnam-airline.png"
            alt=""
            className={classes.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={classes.slideWrapper}>
          <Image
            fill
            src="/images/slogan-vietjet.png"
            alt=""
            className={classes.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={classes.slideWrapper}>
          <Image
            fill
            src="/images/malaysia-airline.png"
            alt=""
            className={classes.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={classes.slideWrapper}>
          <Image
            fill
            src="/images/singapore-airline.png"
            alt=""
            className={classes.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={classes.slideWrapper}>
          <Image
            fill
            src="/images/kitchen-garden.png"
            alt=""
            className={classes.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={classes.slideWrapper}>
          <Image
            fill
            src="/images/kitchen-kmg.png"
            alt=""
            className={classes.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={classes.slideWrapper}>
          <Image
            fill
            src="/images/kitchen-ocean-kitchen.png"
            alt=""
            className={classes.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Marquee>
    </div>
  );
}
