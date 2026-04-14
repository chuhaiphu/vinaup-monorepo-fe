export interface NavLinkItem {
  label: string;
  href: string;
  active?: boolean;
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
