import { Container, Grid, GridCol, Stack, Group } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import classes from './commitment-and-media.module.scss';
import { VinaupGridListIcon, VinaupHeartIcon, VinaupEyeIcon } from '@vinaup/ui/cores';

export interface MiniBlogItem {
    id: number | string;
    title: string;
    image: string;
    likes: string | number;
    views: string | number;
}
export interface CommitmentAndMediaProps {
    youtubeEmbedUrl: string;
    youtubeVideoTitle?: string;
    blogs: MiniBlogItem[];
}

export function CommitmentAndMedia({
    youtubeEmbedUrl,
    youtubeVideoTitle,
    blogs
}: Readonly<CommitmentAndMediaProps>) {
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
                    <Grid gap={{ base: 'xl', md: 'lg' }}>

                        {/* CỘT TRÁI: VIDEO (Dùng iframe Youtube) */}
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack gap="1.5rem" h="100%">
                                <Group justify="space-between" align="center">
                                    <h3 className={classes.subTitle}>Video</h3>
                                    <Link href="/video" className={classes.seeAllLink}>
                                        Tất cả
                                        <VinaupGridListIcon size={23} />
                                    </Link>
                                </Group>

                                <div className={classes.videoWrapper}>
                                    {youtubeEmbedUrl ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={youtubeEmbedUrl}
                                            title={youtubeVideoTitle}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            style={{ border: 'none' }}
                                        ></iframe>
                                    ) : null}
                                </div>
                            </Stack>
                        </GridCol>

                        {/* CỘT PHẢI: MINI BLOGS */}
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack gap="1.5rem" h="100%">
                                <Group justify="space-between" align="center">
                                    <h3 className={classes.subTitle}>Blog</h3>
                                    <Link href="/blog" className={classes.seeAllLink}>
                                        Tất cả
                                        <VinaupGridListIcon size={23} />
                                    </Link>
                                </Group>

                                <Stack gap="lg" justify="space-between" style={{ flexGrow: 1 }}>
                                    {blogs.map((blog) => (
                                        <div key={blog.id} className={classes.miniBlogCard}>

                                            <div className={classes.miniBlogImageWrapper}>
                                                <Image src={blog.image} alt={blog.title} fill sizes="300px" className={classes.miniBlogImage} />
                                            </div>

                                            <div className={classes.miniBlogContent}>
                                                <h4 className={classes.miniBlogTitle} title={blog.title}>
                                                    {blog.title}
                                                </h4>
                                                <Group gap="1rem" className={classes.miniBlogMeta}>
                                                    <Group gap="0.5rem" align="center">
                                                        <VinaupHeartIcon fill="#99AB89" />
                                                        <span>{blog.likes}</span>
                                                    </Group>
                                                    <Group gap="0.5rem" align="center">
                                                        <VinaupEyeIcon stroke='#99AB89' />
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