'use client';
import classes from "./main-footer.module.scss";
import { Container, Grid, Text, Group, ActionIcon } from "@mantine/core";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaArrowRight } from "react-icons/fa6";

export interface FooterColumn {
    title: string;
    links: string[];
}

export interface MainFooterProps {
    columns: FooterColumn[];
}

export default function MainFooter({ columns }: Readonly<MainFooterProps>) {
    return (
        <footer className={classes.footer}>
            <Container size={1232} className={classes.inner}>
                {/* Search Bar Section */}
                <div className={classes.searchForm}>
                    <input
                        type="text"
                        placeholder="Search keywords..."
                        className={classes.searchInput}
                    />
                    <button className={classes.searchButton} aria-label="Search">
                        <FaArrowRight size={18} />
                    </button>
                </div>

                {/* Links Section */}
                <Grid gap={{ base: 'sm', md: 'lg' }} className={classes.linksGrid}>
                    {columns.map((col, index) => (
                        <Grid.Col span={{ base: 6, sm: 3 }} key={index}>
                            <Text className={classes.columnTitle}>{col.title}</Text>
                            <div className={classes.linkList}>
                                {col.links.map((link, idx) => (
                                    <a key={idx} href="#" className={classes.linkItem}>
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>

            {/* Bottom Bar Section */}
            <div className={classes.bottomBar}>
                <Container size={1232}>
                    <div className={classes.bottomBarInner}>
                        <Text className={classes.copyright}>
                            The Local Travel © {new Date().getFullYear()} by VinaUp
                        </Text>

                        <Group gap="sm" className={classes.socials}>
                            <ActionIcon
                                variant="filled"
                                radius="xl"
                                size="md"
                                className={classes.socialIcon}
                            >
                                <FaFacebookF size={14} />
                            </ActionIcon>
                            <ActionIcon
                                variant="filled"
                                radius="xl"
                                size="md"
                                className={classes.socialIcon}
                            >
                                <FaInstagram size={14} />
                            </ActionIcon>
                            <ActionIcon
                                variant="filled"
                                radius="xl"
                                size="md"
                                className={classes.socialIcon}
                            >
                                <FaTwitter size={14} />
                            </ActionIcon>
                            <ActionIcon
                                variant="filled"
                                radius="xl"
                                size="md"
                                className={classes.socialIcon}
                            >
                                <FaEnvelope size={14} />
                            </ActionIcon>
                        </Group>
                    </div>
                </Container>
            </div>
        </footer>
    );
}