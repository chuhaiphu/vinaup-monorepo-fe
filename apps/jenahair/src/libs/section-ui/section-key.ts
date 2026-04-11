// Internal component keys - DO NOT change these values
// These keys map to actual React components in the registry
export const SECTION_KEYS = {
  LANDING_CAROUSEL_V1: 'LANDING_CAROUSEL_V1',
  LANDING_FOOTER_V1: 'LANDING_FOOTER_V1',
  VIDEO_SECTION_V1: 'VIDEO_SECTION_V1',
} as const;

export type SectionKey = (typeof SECTION_KEYS)[keyof typeof SECTION_KEYS];
