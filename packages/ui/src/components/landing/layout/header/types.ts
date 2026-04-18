/** Flat or tree nav items for headers; tree uses optional `children`. */
export interface NavLinkItem {
  label: string;
  href: string;
  active?: boolean;
  children?: NavLinkItem[];
}

export interface SocialLinkItem {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export interface HeaderProps {
  navLinks: NavLinkItem[];
  socialLinks: SocialLinkItem[];
}
