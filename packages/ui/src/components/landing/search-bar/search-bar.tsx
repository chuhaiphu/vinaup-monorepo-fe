'use client';

import { Group, Text, UnstyledButton, TextInput } from '@mantine/core';
import { IoLocationOutline, IoSearch } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import classes from './search-bar.module.scss';

export function SearchBar() {
  return (
    <div className={classes.searchBarWrapper}>
      <div className={classes.searchInner}>

        {/* 1. Phần Location */}
        <UnstyledButton className={classes.locationField}>
          <Group gap="sm" wrap="nowrap" align="center">
            {/* CỘT 1: Icon định vị - Giữ lại trên Mobile */}
            <IoLocationOutline size={24} className={classes.locationIcon} />

            {/* CỘT 2: Cụm chữ - Sẽ ẩn trên Mobile */}
            <div className={classes.textColumn}>
              <Text size="xs" fw={500} c="dimmed" lts={1}>Location</Text>
              <Text fw={600} size="sm">Where to go?</Text>
            </div>

            {/* CỘT 3: Chevron - Sẽ ẩn trên Mobile */}
            <div className={classes.chevronColumn}>
              <FaChevronDown size={10} />
            </div>
          </Group>
        </UnstyledButton>

        {/* Vạch kẻ - Sẽ ẩn trên Mobile */}
        <div className={classes.divider} />

        {/* 2. Ô Nhập liệu */}
        <TextInput
          placeholder="Type a keyword..."
          variant="unstyled"
          className={classes.searchInput}
        />

        {/* 3. Nút Search */}
        <button className={classes.searchBtn}>
          <IoSearch size={20} className={classes.searchIcon} />
          <Text fw={500} className={classes.btnText}>Search</Text>
        </button>

      </div>
    </div>
  );
}