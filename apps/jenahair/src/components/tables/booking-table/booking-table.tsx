'use client';

import { Select, Text, Stack, Box } from '@mantine/core';

import { EntitiesTable, EntitiesTableColumnProps } from '@vinaup/ui/admin';
import classes from './booking-table.module.scss';
import { IoChevronDownOutline } from 'react-icons/io5';

export interface BookingItem {
  id: string;
  type: string;
  description: string;
  price: number;
  quantity: number;
}

interface BookingTableProps {
  bookingItems: BookingItem[];
  onQuantityChange: (id: string, quantity: number) => void;
}

export default function BookingTable({ bookingItems, onQuantityChange }: BookingTableProps) {
  const handleQuantityChange = (id: string, value: string | null) => {
    const quantity = parseInt(value || '0');
    onQuantityChange(id, quantity);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN');
  };

  const quantityOptions = Array.from({ length: 56 }, (_, i) => ({
    value: i.toString(),
    label: i.toString(),
  }));

  const columns: EntitiesTableColumnProps<BookingItem>[] = [
    {
      key: 'paymentContent',
      width: '30%',
      header: 'Payment content',
      headerAlign: 'left',
      cellAlign: 'left',
      render: ({ entity }) => (
        <Stack gap={4}>
          <Text size="md" fw={500}>
            {entity.type}
          </Text>
          <Text size="sm" c="dimmed">
            {entity.description}
          </Text>
        </Stack>
      ),
    },
    {
      key: 'price',
      width: '25%',
      header: 'Price',
      headerAlign: 'right',
      cellAlign: 'right',
      render: ({ entity }) => (
        <Text size="md">{formatPrice(entity.price)}</Text>
      ),
    },
    {
      key: 'quantity',
      width: '20%',
      header: 'QTy.',
      headerAlign: 'right',
      cellAlign: 'right',
      render: ({ entity }) => (
        <Box className={classes.quantityBox}>
          <Select
            data={quantityOptions}
            value={entity.quantity.toString()}
            onChange={(value) => handleQuantityChange(entity.id, value)}
            classNames={{
              root: classes.quantitySelect,
              input: classes.quantitySelectInput,
              option: classes.quantitySelectOption
            }}
            allowDeselect={false}
            rightSection={<IoChevronDownOutline color="var(--vinaup-blue-link)" size={20} />}
          />
        </Box>
      ),
    },
    {
      key: 'total',
      width: '25%',
      header: 'Total',
      headerAlign: 'right',
      cellAlign: 'right',
      render: ({ entity }) => (
        <Text size="md" fw={500}>
          {formatPrice(entity.price * entity.quantity)}
        </Text>
      ),
    },
  ];

  return (
    <EntitiesTable
      data={bookingItems}
      columns={columns}
      loading={false}
      classNames={{
        wrapper: classes.bookingTableWrapper,
        table: {
          table: classes.table,
          thead: classes.thead,
          tbody: classes.tbody,
          tr: classes.tr,
          th: classes.th,
          td: classes.td,
        },
      }}
    />
  );
}

