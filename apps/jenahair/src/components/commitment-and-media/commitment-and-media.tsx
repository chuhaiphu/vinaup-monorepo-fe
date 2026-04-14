import { Container, Grid, GridCol, Stack, Group } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import classes from './commitment-and-media.module.scss';
import { MOCK_MEDIA_DATA } from '@/mocks/commitment-media';
import { VinaupGridListIcon } from '@vinaup/ui/cores';

// Icon Trái tim (Màu xanh giống thiết kế)
const HeartIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#99AB89" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

// Icon Con mắt (Stroke)
const EyeIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#99AB89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

export function CommitmentAndMedia() {
    return (
        <section className={classes.sectionWrapper}>
            <Container size={1232}>
                <Stack gap="3rem">

                    {/* PHẦN 1: HEADER CAM KẾT */}
                    <div className={classes.header}>
                        <h2 className={classes.mainTitle}>Salon cam kết với khách hàng</h2>
                        <p className={classes.mainDescription}>
                            Salon phục vụ làm đẹp cho khách hàng, đến khi hài lòng mà không phụ thu thêm chi phí phát sinh. Sản phẩm phục vụ khách hàng là hàng chính hãng
                        </p>
                    </div>

                    {/* PHẦN 2: LƯỚI VIDEO VÀ BLOG */}
                    <Grid gap={{ base: 'md', md: 'lg' }}>

                        {/* CỘT TRÁI: VIDEO */}
                        <GridCol span={{ base: 12, md: 6 }}>
                            {/* Thêm h="100%" để Stack bung hết chiều cao */}
                            <Stack gap="1.5rem" h="100%">
                                <Group justify="space-between" align="flex-end">
                                    <h3 className={classes.subTitle}>Video</h3>
                                    <Link href="/video" className={classes.seeAllLink}>
                                        Tất cả
                                        <VinaupGridListIcon size={23} />
                                    </Link>
                                </Group>

                                <div className={classes.videoWrapper}>
                                    <Image
                                        src={MOCK_MEDIA_DATA.video.thumbnail}
                                        alt="Jena Hair Video"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className={classes.videoThumbnail}
                                    />
                                    {/* Nút Play SVG tự vẽ cực nhẹ */}
                                    <div className={classes.playButton}>
                                        <svg viewBox="0 0 68 48" width="68" height="48">
                                            <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#FF0000"></path>
                                            <path d="M45,24 27,14 27,34" fill="#FFFFFF"></path>
                                        </svg>
                                    </div>
                                </div>
                            </Stack>
                        </GridCol>

                        {/* CỘT PHẢI: MINI BLOGS */}
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack gap="1.5rem" h="100%">
                                <Group justify="space-between" align="flex-end">
                                    <h3 className={classes.subTitle}>Blog</h3>
                                    <Link href="/blog" className={classes.seeAllLink}>
                                        Tất cả
                                        <VinaupGridListIcon size={23} />
                                    </Link>
                                </Group>

                                {/* justify="space-between" giúp 2 blog tự động đẩy nhau ra bằng chiều cao Video */}
                                <Stack gap="1.5rem" justify="space-between" style={{ flexGrow: 1 }}>
                                    {MOCK_MEDIA_DATA.miniBlogs.map((blog) => (
                                        <div key={blog.id} className={classes.miniBlogCard}>

                                            <div className={classes.miniBlogImageWrapper}>
                                                <Image src={blog.image} alt={blog.title} fill sizes="300px" className={classes.miniBlogImage} />
                                            </div>

                                            <div className={classes.miniBlogContent}>
                                                <h4 className={classes.miniBlogTitle} title={blog.title}>
                                                    {blog.title}
                                                </h4>
                                                <Group gap="1rem" className={classes.miniBlogMeta}>
                                                    <Group gap="0.25rem" align="center">
                                                        <HeartIcon />
                                                        <span>{blog.likes}</span>
                                                    </Group>
                                                    <Group gap="0.25rem" align="center">
                                                        <EyeIcon />
                                                        <span>{blog.views}</span>
                                                    </Group>
                                                </Group>
                                            </div>

                                        </div>
                                    ))}
                                </Stack>
                            </Stack>
                        </GridCol>

                    </Grid>
                </Stack>
            </Container>
        </section>
    );
}