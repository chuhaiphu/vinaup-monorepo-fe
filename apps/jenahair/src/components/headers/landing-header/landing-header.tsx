import { getThemeConfigActionPublic } from '@/actions/theme-config-action';
import { getAllMenusActionPublic } from '@/actions/menu-action';
import { getAllBlogsActionPublic } from '@/actions/blog-action';
import { getAllDiariesActionPublic } from '@/actions/diary-action';
import { getAllPagesPublicActionPublic } from '@/actions/page-action';
import type { IMenuResponse } from '@/interfaces/menu-interface';
import { TreeManager } from '@vinaup/utils/tree-manager';
import { JenhairIcon, VinaupFacebookIcon, VinaupGoogleMapIcon, VinaupInstagramIcon, VinaupTiktokIcon } from '@vinaup/ui/cores';
import WhatsappIcon from '@vinaup/ui/cores/icons/whatsapp-icon.svg';
import {
  StickyHeader,
  Sidebar,
  type SidebarNavLink,
} from '@vinaup/ui/landing';
import { isExternalEndpoint, parseEndpoint } from '@vinaup/utils';
import { StickyHeaderContent } from './sticky-header-content';
import BlogsDiariesSpotlightSearchContent from './blogs-diaries-spotlight-search-content';

const SOCIAL_ICON_MAP: Record<string, { icon: React.ReactNode; label: string }> = {
  googlemap: {
    icon: <VinaupGoogleMapIcon size={36} />,
    label: 'Google Map',
  },
  tiktok: {
    icon: <VinaupTiktokIcon size={36} />,
    label: 'Tiktok',
  },
  facebook: {
    icon: <VinaupFacebookIcon size={36} />,
    label: 'Facebook',
  },
  instagram: {
    icon: <VinaupInstagramIcon size={36} />,
    label: 'Instagram',
  },
  whatsapp: {
    icon: <WhatsappIcon width={36} height={38} />,
    label: 'WhatsApp',
  },
};

function buildNavLinks(flatMenus: IMenuResponse[]): SidebarNavLink[] {
  if (!flatMenus.length) return [];

  const root = new TreeManager(flatMenus).getRoot();
  if (!root?.children?.length) return [];

  function toNavLink(menu: IMenuResponse): SidebarNavLink {
    const href = parseEndpoint(menu.customUrl);
    return {
      id: menu.id,
      label: menu.title,
      href,
      external: isExternalEndpoint(href),
      children: menu.children?.length ? menu.children.map(toNavLink) : undefined,
    };
  }

  return root.children.map(toNavLink);
}

export default async function LandingHeader() {
  'use cache';
  const [
    socialLinksResponse,
    menusResponse,
    blogsResponse,
    diariesResponse,
    pagesResponse,
  ] = await Promise.all([
    getThemeConfigActionPublic(),
    getAllMenusActionPublic(),
    getAllBlogsActionPublic(),
    getAllDiariesActionPublic(),
    getAllPagesPublicActionPublic(),
  ]);

  const socialLinksData = socialLinksResponse.data?.value ?? [];

  const socialLinks = socialLinksData
    .filter((item) => item.isActive)
    .flatMap((item) => {
      const key = item.platform.toLowerCase();
      const iconConfig = SOCIAL_ICON_MAP[key];
      if (!iconConfig) return [];
      return [{ icon: iconConfig.icon, href: item.url, label: iconConfig.label }];
    });

  const navLinks = buildNavLinks(menusResponse.data ?? []);

  return (
    <>
      <StickyHeader>
        <StickyHeaderContent
          socialLinks={socialLinks}
          logo={<JenhairIcon size={42} fill="var(--vinaup-amber)" />}
          spotlightChildren={
            <BlogsDiariesSpotlightSearchContent
              blogsResponse={blogsResponse.data ?? []}
              diariesResponse={diariesResponse.data ?? []}
              pagesResponse={pagesResponse.data ?? []}
            />
          }
        />
      </StickyHeader>
      <Sidebar navLinks={navLinks} drawerPosition="right" />
    </>
  );
}
