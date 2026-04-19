import { getThemeConfigActionPublic } from '@/actions/theme-config-action';
import { getAllMenusActionPublic } from '@/actions/menu-action';
import type { IMenuResponse } from '@/interfaces/menu-interface';
import { TreeManager } from '@vinaup/utils/tree-manager';
import { JenhairIcon } from '@vinaup/ui/cores';
import FacebookIcon from '@vinaup/ui/cores/icons/facebook-icon.svg';
import InstagramIcon from '@vinaup/ui/cores/icons/instagram-icon.svg';
import TiktokIcon from '@vinaup/ui/cores/icons/tiktok.svg';
import GoogleMapIcon from '@vinaup/ui/cores/icons/google-map.svg';
import WhatsappIcon from '@vinaup/ui/cores/icons/whatsapp-icon.svg';
import {
  HeaderWithSearchAndSidebar,
  Sidebar,
  type SidebarNavLink,
} from '@vinaup/ui/landing';
import { isExternalEndpoint, parseEndpoint } from '@vinaup/utils';

const SOCIAL_ICON_MAP: Record<string, { icon: React.ReactNode; label: string }> = {
  googlemap: {
    icon: <GoogleMapIcon width={36} height={38} />,
    label: 'Google Map',
  },
  tiktok: {
    icon: <TiktokIcon width={36} height={38} />,
    label: 'Tiktok',
  },
  facebook: {
    icon: <FacebookIcon width={36} height={38} />,
    label: 'Facebook',
  },
  instagram: {
    icon: <InstagramIcon width={36} height={38} />,
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
  const [socialLinksResponse, menusResponse] = await Promise.all([
    getThemeConfigActionPublic(),
    getAllMenusActionPublic(),
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
    <HeaderWithSearchAndSidebar
      socialLinks={socialLinks}
      logo={<JenhairIcon size={42} fill="var(--vinaup-amber)" />}
      sidebarChildren={<Sidebar navLinks={navLinks} drawerPosition="right" />}
    />
  );
}
