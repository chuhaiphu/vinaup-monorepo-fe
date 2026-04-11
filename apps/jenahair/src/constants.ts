export const MAX_IMAGE_COUNT_ALLOWED = 5;
export const VN_PROVINCES = [
  "Ha Noi",
  "Hue",
  "Quang Ninh",
  "Cao Bang",
  "Lang Son",
  "Lai Chau",
  "Dien Bien",
  "Son La",
  "Thanh Hoa",
  "Nghe An",
  "Ha Tinh",
  "Tuyen Quang",
  "Lao Cai",
  "Thai Nguyen",
  "Phu Tho",
  "Bac Ninh",
  "Hung Yen",
  "Hai Phong",
  "Ninh Binh",
  "Quang Tri",
  "Da Nang",
  "Quang Ngai",
  "Gia Lai",
  "Khanh Hoa",
  "Lam Dong",
  "Dak Lak",
  "Ho Chi Minh",
  "Dong Nai",
  "Tay Ninh",
  "Can Tho",
  "Vinh Long",
  "Dong Thap",
  "Ca Mau",
  "An Giang"
];

export const SERVICE_ITEMS = [
  {
    name: "Visa Services",
    endpoint: "/visa-services",
    imageUrl: "/images/visa-service.png",
  },
  {
    name: "Car Rental",
    endpoint: "/car-rental",
    imageUrl: "/images/car-rental.png",
  },
  {
    name: "Flight Ticket",
    endpoint: "/flight-ticket",
    imageUrl: "/images/vn-airline.png",
  },
  {
    name: "Hotel Booking",
    endpoint: "/hotel-booking",
    imageUrl: "/images/resort.png",
  },
];

export const StatusDisplayMap: Record<string, string> = {
  ['public']: 'Public',
  ['private']: 'Private',
};

export const HOTEL_TYPES = [
  { value: '1-star', label: '1 star' },
  { value: '2-star', label: '2 star' },
  { value: '3-star', label: '3 star' },
  { value: '4-star', label: '4 star' },
  { value: '5-star', label: '5 star' },
];

export const HotelTypeDisplayMap: Record<string, string> = {
  ['1-star']: '1 Star',
  ['2-star']: '2 Star',
  ['3-star']: '3 Star',
  ['4-star']: '4 Star',
  ['5-star']: '5 Star',
};

export const ROOM_TYPES = [
  { value: 'standard', label: 'Standard room' },
  { value: 'superior', label: 'Superior room' },
  { value: 'deluxe', label: 'Deluxe room' },
  { value: 'family', label: 'Family room' },
  { value: 'suite', label: 'Suite' },
];

export const RoomTypeDisplayMap: Record<string, string> = {
  ['standard']: 'Standard Room',
  ['family']: 'Family Room',
  ['superior']: 'Superior Room',
  ['deluxe']: 'Deluxe Room',
  ['suite']: 'Suite',
};

export const PAGE_TYPES = [
  { value: 'landing', label: 'Default' },
  { value: 'contact', label: 'Contact' },
];

export const PageTypeDisplayMap: Record<string, string> = {
  ['landing']: 'Default Page',
  ['contact']: 'Contact Page',
};

export const TOUR_BADGE_TYPES = [
  { value: 'hot', label: 'Hot' },
  { value: 'sale', label: 'Sale' },
  { value: 'new', label: 'New' },
];

export const UPDATE_SORT_ORDER_OFFSET = 9999;
export const OPEN_DESTINATIONS_POPOVER_EVENT = "stv:searchbar:open-destinations";
if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
  throw new Error('Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY env variable');
}
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;