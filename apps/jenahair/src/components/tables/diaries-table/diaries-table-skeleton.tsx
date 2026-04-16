'use client';
import { Table } from '@mantine/core';
import classes from './diaries-table.module.scss';
import { Skeleton } from '@vinaup/ui/landing';

const COLUMNS = 6;
const ROWS = 5;

export default function DiariesTableSkeleton() {
  return (
    <div className={classes.tableWrapper}>
      <Table className={classes.table}>
        <Table.Thead className={classes.thead}>
          <Table.Tr className={classes.tr}>
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <Table.Th key={i} className={classes.th} p="sm">
                <Skeleton height={20} borderRadius={4} />
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className={classes.tbody}>
          {Array.from({ length: ROWS }).map((_, rowIndex) => (
            <Table.Tr key={rowIndex} className={classes.tr}>
              <Table.Td colSpan={COLUMNS} p="sm">
                <Skeleton height={20} borderRadius={4} />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
