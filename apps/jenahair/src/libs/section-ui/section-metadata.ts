import { SECTION_KEYS } from './section-key';

export const SECTION_METADATA = {
  [SECTION_KEYS.LANDING_CAROUSEL_V1]: {
    name: 'Banner',
    properties: {
      slides: {
        titleMain: null,
        titleHighlight: null,
        subTitle: null,
        imageUrl: null,
        alt: null,
        href: null,
      },
      showText: null,
      height: null,
      loop: null,
      orientation: null,
    },
  },
  [SECTION_KEYS.LANDING_FOOTER_V1]: {
    name: 'Footer',
    properties: {
      title: null,
      info: {
        phoneWhatsapp: null,
        email: null,
        address: null,
        websiteUrl: null,
        facebookUrl: null,
        tiktokUrl: null,
        youtubeUrl: null,
        instagramUrl: null,
      },
      logoUrl: null,
      testimonials: null,
      bottomBar: {
        brandName: null,
        brandUrl: null,
        copyrightYear: null,
        poweredByLabel: null,
        poweredByUrl: null,
      },
    },
  },
  [SECTION_KEYS.VIDEO_SECTION_V1]: {
    name: 'Video Section',
    properties: {
      url: null,
      title: null,
      height: null,
      thumbnailUrl: null,
    },
  },
};
