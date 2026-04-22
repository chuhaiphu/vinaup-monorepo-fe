import { Group, Text, UnstyledButton, TextInput } from '@mantine/core';
import { IoLocationOutline, IoSearch } from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa6';
import classes from './search-bar.module.scss';

export function SearchBar() {
  return (
    <div className={classes.searchBarWrapper}>
      <div className={classes.searchInner}>
        <UnstyledButton className={classes.locationField}>
          <Group gap="sm" wrap="nowrap" align="center">
            <IoLocationOutline size={24} className={classes.locationIcon} />

            <div className={classes.textColumn}>
              <Text size="xs" fw={500} c="dimmed" lts={1}>Location</Text>
              <Text fw={600} size="sm">Where to go?</Text>
            </div>

            <div className={classes.chevronColumn}>
              <FaChevronDown size={10} />
            </div>
          </Group>
        </UnstyledButton>

        <div className={classes.divider} />

        <TextInput
          placeholder="Type a keyword..."
          variant="unstyled"
          className={classes.searchInput}
        />

        <button className={classes.searchBtn}>
          <IoSearch size={20} className={classes.searchIcon} />
          <Text fw={500} className={classes.btnText}>Search</Text>
        </button>
      </div>
    </div>
  );
}
