import { getThemeConfigActionPublic } from '@/actions/theme-config-action';
import { VideoSection } from '@vinaup/ui/landing';

export async function VideoSectionShowcase() {
  const result = await getThemeConfigActionPublic();
  const socialLinks = result.data?.value ?? [];
  const youtubeItem = socialLinks.find(
    (item) => item.platform.toLowerCase() === 'youtube' && item.isActive
  );

  return <VideoSection url={youtubeItem?.url ?? ''} />;
}
