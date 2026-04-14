import Marquee from 'react-fast-marquee';
import classes from './auto-scroll-carousel.module.scss';
import { Box } from '@mantine/core';

// Bạn có thể đổi tên các hãng mỹ phẩm tóc ở đây
const PARTNER_BRANDS = [
    'Milbon',
    'ATS',
    'L’Oréal',
    'Olaplex',
    'Kérastase'
];

export function AutoScrollCarousel() {
    return (
        <Box className={classes.wrapper}>
            <Marquee autoFill speed={80} gradient={false} pauseOnHover={false} direction="right">
                {PARTNER_BRANDS.map((brand, index) => (
                    <div key={index} className={classes.brandItem}>
                        {brand}
                    </div>
                ))}
            </Marquee>
        </Box>
    );
}