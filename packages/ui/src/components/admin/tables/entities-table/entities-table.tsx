import { Box, Table } from '@mantine/core';
import classes from './entities-table.module.scss';
import { EntitiesTableProps } from './_props';

export function EntitiesTable<T extends { id: string }>({
  data,
  columns,
  classNames,
}: EntitiesTableProps<T>) {
  const tableClassNames = {
    table: classNames?.table?.table ?? classes.table,
    thead: classNames?.table?.thead ?? classes.thead,
    tbody: classNames?.table?.tbody ?? classes.tbody,
    tr: classNames?.table?.tr ?? classes.tr,
    th: classNames?.table?.th ?? classes.th,
    td: classNames?.table?.td ?? classes.td,
  };

  return (
    <Box className={classes.tableWrapper + ` ${classNames?.wrapper}`}>
      <Table classNames={tableClassNames}>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th key={col.key} w={col.width} ta={col.headerAlign}>
                {col.header}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.map((entity) => (
            <Table.Tr key={entity.id}>
              {columns.map((col) => (
                <Table.Td key={col.key} ta={col.cellAlign}>
                  {col.render({ entity: entity })}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
}
