
import React from 'react';
import classes from './layout.module.scss';
import { Footer, HeaderCenteredLogo } from '@vinaup/ui/landing';
import { ScrollToTop } from '@vinaup/ui/landing';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa6';

const NAV_LINKS = [
  { label: 'Home', href: '/', active: true },
  { label: 'Tour', href: '/tour' },
  { label: 'Destination', href: '/destination' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
];

const SOCIAL_LINKS = [
  {
    icon: <FaFacebookF size={20} />,
    href: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    icon: <FaInstagram size={20} />,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  {
    icon: <FaWhatsapp size={22} />,
    href: 'https://whatsapp.com',
    label: 'Whatsapp',
  },
  { icon: <FaYoutube size={22} />, href: 'https://youtube.com', label: 'Youtube' },
];

const FOOTER_LINKS = [
  {
    title: 'Northern Vietnam',
    links: ['Hanoi', 'Ha Long Bay', 'Sapa', 'Ninh Binh', 'Ha Giang'],
  },
  {
    title: 'Central Vietnam',
    links: ['Da Nang', 'Hoi An', 'Hue', 'Nha Trang', 'Quy Nhon'],
  },
  {
    title: 'Southern Vietnam',
    links: ['Ho Chi Minh City', 'Da Lat', 'Can Tho', 'Vung Tau', 'Tay Ninh'],
  },
  {
    title: 'Beaches & Experiences',
    links: [
      'Phu Quoc',
      'Con Dao',
      'Ha Long Cruises',
      'Luxury Resorts',
      'Eco Tours',
    ],
  },
];

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.landingLayout}>
      <HeaderCenteredLogo navLinks={NAV_LINKS} socialLinks={SOCIAL_LINKS} />
      {children}
      <Footer columns={FOOTER_LINKS} />
      <ScrollToTop />
    </div>
  );
}
