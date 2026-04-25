'use client';

import '@mantine/spotlight/styles.css';

import { UnstyledButton } from '@mantine/core';
import { IoSearch } from 'react-icons/io5';
import {
  Spotlight,
  SpotlightActionData,
  SpotlightProps,
  spotlight,
} from '@mantine/spotlight';
import classes from './spotlight-search.module.scss';

export interface SpotlightSearchProps {
  spotlightActions: SpotlightActionData[];
  classNames?: SpotlightProps['classNames'];
}

export function SpotlightSearch({
  spotlightActions,
  classNames,
}: Readonly<SpotlightSearchProps>) {
  return (
    <>
      <UnstyledButton
        onClick={() => spotlight.open()}
        className={classes.searchButton}
      >
        <IoSearch size={22} />
      </UnstyledButton>
      <Spotlight
        scrollAreaProps={{
          offsetScrollbars: false,
        }}
        classNames={classNames}
        actions={spotlightActions}
        nothingFound="Không tìm thấy nội dung"
        highlightQuery
        styles={{
          actionsList: {
            maxHeight: '480px',
          },
        }}
        searchProps={{
          leftSection: <IoSearch size={20} />,
          placeholder: '...',
        }}
      />
    </>
  );
}
