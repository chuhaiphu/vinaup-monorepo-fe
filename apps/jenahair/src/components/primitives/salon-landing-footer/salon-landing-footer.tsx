import { Container, Grid, GridCol, Group, Text, Box, Anchor } from '@mantine/core';
import Image from 'next/image';
import classes from './salon-landing-footer.module.scss';

export function SalonLandingFooter() {
  return (
    <Box component="footer" className={classes.footerWrapper}>
      <Container
        size={'xl'}
        px={{ base: 0, md: 'md' }}
        className={classes.footerContainer}
      >
        <div className={classes.mainFooter}>
          <Grid gap={{ base: 'xl', md: 40 }} align="center" justify="space-between">
            <GridCol span={{ base: 12, md: 6 }}>
              <div className={classes.contactBlock}>
                <Image
                  src="/images/logo-icon.svg"
                  alt="Jenahair.com Logo"
                  width={120}
                  height={120}
                  className={classes.logoImage}
                />

                <div className={classes.contactInfo}>
                  <Text className={classes.contactLabel}>
                    Nhận booking theo lịch hẹn
                  </Text>
                  <Text className={classes.phoneNumber}>0981824770</Text>

                  <Group gap="sm" className={classes.socialLinks}>
                    <Anchor
                      href="https://zalo.me/0981824770"
                      target="_blank"
                      className={classes.socialLink}
                    >
                      Zalo
                    </Anchor>
                    <Anchor href="https://m.me/1926675050924056" target="_blank" className={classes.socialLink}>
                      Messenger
                    </Anchor>
                  </Group>
                </div>
              </div>
            </GridCol>

            <GridCol span={{ base: 12, md: 6 }}>
              <div className={classes.hoursBlock}>
                <Text className={classes.hoursLabel}>Thời gian phục vụ</Text>
                <Text className={classes.hoursTime}>09h00 - 20h00</Text>
                <Text className={classes.hoursDays}>
                  Tất cả các ngày trong tuần
                </Text>
              </div>
            </GridCol>
          </Grid>
        </div>

        <div className={classes.copyright}>
          <Text
            size="md"
            style={{ color: 'inherit' }}
            className={classes.copyrightText}
          >
            Jenahair © 2026 by{' '}
            <Anchor
              href="https://vinaup.net"
              target="_blank"
              rel="noopener noreferrer"
              size=""
            >
              VinaUp
            </Anchor>
          </Text>
        </div>
      </Container>
    </Box>
  );
}
