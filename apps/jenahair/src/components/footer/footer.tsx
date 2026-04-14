// footer.tsx
import { Container, Grid, GridCol, Group, Text, Box } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import classes from './footer.module.scss';

export function Footer() {
    return (
        <Box component="footer" className={classes.footerWrapper}>
            <Container size={1232} px={{ base: 0, md: 'md' }} className={classes.footerContainer}>

                {/* THANH FOOTER CHÍNH MÀU XÁM KHI TRÊN DESKTOP, FULL WIDTH MOBILE */}
                <div className={classes.mainFooter}>
                    <Grid gap={{ base: 'xl', md: 40 }} align="center" justify="space-between">

                        {/* CỘT TRÁI: THÔNG TIN LIÊN HỆ */}
                        <GridCol span={{ base: 12, md: 6 }}>
                            <div className={classes.contactBlock}>

                                {/* Logo */}
                                <div className={classes.logoWrapper}>
                                    <Image
                                        src="/favicon.ico"
                                        alt="Jenahair.com Logo"
                                        width={100}
                                        height={100}
                                        className={classes.logoImage}
                                        unoptimized
                                    />
                                </div>

                                {/* Chữ Liên hệ */}
                                <div className={classes.contactInfo}>
                                    <Text className={classes.contactLabel}>Nhận booking theo lịch hẹn</Text>
                                    <Text className={classes.phoneNumber}>0981824770</Text>

                                    <Group gap="sm" className={classes.socialLinks}>
                                        <Link href="#" className={classes.socialLink}>Zalo</Link>
                                        <Link href="#" className={classes.socialLink}>Messenger</Link>
                                    </Group>
                                </div>
                            </div>
                        </GridCol>

                        {/* CỘT PHẢI: THỜI GIAN PHỤC VỤ */}
                        <GridCol span={{ base: 12, md: 6 }}>
                            <div className={classes.hoursBlock}>
                                <Text className={classes.hoursLabel}>Thời gian phục vụ</Text>
                                <Text className={classes.hoursTime}>09h00 - 19h30</Text>
                                <Text className={classes.hoursDays}>Tất cả các ngày trong tuần</Text>
                            </div>
                        </GridCol>

                    </Grid>
                </div>

                {/* DÒNG BẢN QUYỀN (COPYRIGHT) */}
                <div className={classes.copyright}>
                    <Text size="md" style={{ color: 'inherit' }}>
                        <span className={classes.brandName}>Jenahair</span> © 2026 by VinaUp
                    </Text>
                </div>

            </Container>
        </Box>
    );
}