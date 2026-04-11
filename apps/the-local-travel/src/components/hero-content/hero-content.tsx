'use client';

import { Container, Title } from '@mantine/core';
import classes from './hero-content.module.scss';
import { SearchBar } from '@vinaup/ui/landing';

export default function HeroContent() {
  return (
    <Container size={1232} className={classes.inner}>
      <div className={classes.content}>

        {/* TITLE */}
        <div className={classes.titleWrapper}>
          <Title className={classes.title}>
            Discover the <span className={classes.highlight}>Timeless Beauty</span> of Vietnam
          </Title>
        </div>

        {/* THANH SEARCH BAR */}
        <div className={classes.searchWrapper}>
          <SearchBar />
        </div>

      </div>
    </Container>
  );
}