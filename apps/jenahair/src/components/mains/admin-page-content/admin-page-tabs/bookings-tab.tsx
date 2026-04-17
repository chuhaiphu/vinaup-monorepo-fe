'use client';

import { Group, Text, Stack, Modal, ActionIcon, Button } from '@mantine/core';
import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { EntitiesTable } from '@vinaup/ui/admin';
import { EntitiesTableColumnProps } from '@vinaup/ui/admin';
import { IBookingResponse } from '@/interfaces/booking-interface';
import { SlOptionsVertical } from 'react-icons/sl';
import { deleteBookingActionPrivate } from '@/actions/booking-action';
import { notifications } from '@mantine/notifications';
import { GrTrash } from 'react-icons/gr';
import classes from './bookings-tab.module.scss';

interface BookingsTabProps {
  bookings: IBookingResponse[];
}

export default function BookingsTab({ bookings }: BookingsTabProps) {
  const [bookingDetailModalOpened, setBookingDetailModalOpened] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBookingResponse | null>(null);
  const [deleteBookingModalOpened, setDeleteBookingModalOpened] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' VND';
  };

  const handleViewBookingDetails = (booking: IBookingResponse) => {
    setSelectedBooking(booking);
    setBookingDetailModalOpened(true);
  };

  const handleOpenDeleteBookingModal = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setDeleteBookingModalOpened(true);
  };

  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteBookingActionPrivate(bookingToDelete);
      if (result.success) {
        notifications.show({
          title: 'Success',
          message: 'Booking deleted successfully',
          color: 'green',
        });
        setDeleteBookingModalOpened(false);
        setBookingToDelete(null);
      } else {
        notifications.show({
          title: 'Error',
          message: result.error || 'Failed to delete booking',
          color: 'red',
        });
      }
    } catch {
      notifications.show({
        title: 'Error',
        message: 'An unexpected error occurred',
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const bookingColumns: EntitiesTableColumnProps<IBookingResponse>[] = [
    {
      key: 'customer',
      width: '25%',
      header: 'Customer',
      headerAlign: 'left',
      cellAlign: 'left',
      render: ({ entity }) => (
        <Stack gap={4}>
          <Group gap={4}>
            <Text size="sm" c='dimmed'>
              Fullname:
            </Text>
            <Text size="sm" fw={500}>
              {entity.customerName}
            </Text>
          </Group>

          <Group gap={4}>
            <Text size="sm" c='dimmed'>
              Email:
            </Text>
            <Text size="sm" fw={500}>
              {entity.customerEmail}
            </Text>
          </Group>
        </Stack>
      ),
    },
    {
      key: 'tour',
      width: '45%',
      header: 'Tour',
      headerAlign: 'left',
      cellAlign: 'left',
      render: ({ entity }) => (
        <Text size="sm" fw={500}>
          {entity.tour.title}
        </Text>
      ),
    },
    {
      key: 'createdAt',
      width: '10%',
      header: 'Created At',
      headerAlign: 'center',
      cellAlign: 'center',
      render: ({ entity }) => (
        <Text size="sm">{formatDate(entity.createdAt)}</Text>
      ),
    },
    {
      key: 'actions',
      width: '10%',
      headerAlign: 'right',
      header: (
        <div className={`${classes.columnHeaderContent} ${classes.actionColumnHeaderContent}`}>
          <ActionIcon variant="transparent">
            <SlOptionsVertical size={24} color="#01426e" />
          </ActionIcon>
        </div>
      ),
      cellAlign: 'right',
      render: ({ entity }) => (
        <Group justify="flex-end" gap="xs">
          <ActionIcon
            variant="transparent"
            onClick={() => handleOpenDeleteBookingModal(entity.id)}
          >
            <GrTrash size={20} color="#01426e" />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            onClick={() => handleViewBookingDetails(entity)}
          >
            <IoEyeOutline size={24} color="#01426e" />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <>
      {bookings.length > 0 ? (
        <EntitiesTable
          data={bookings}
          columns={bookingColumns}
          loading={false}
          classNames={{
            wrapper: classes.tableWrapper,
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
      ) : (
        <Text c="dimmed" ta="center" py="xl">
          No bookings found
        </Text>
      )}

      <Modal
        opened={bookingDetailModalOpened}
        onClose={() => setBookingDetailModalOpened(false)}
        title="Booking Details"
        size="lg"
        centered
      >
        {selectedBooking && (
          <Stack gap="md">
            <div>
              <Text size="sm" fw={700} mb={4}>Customer Information</Text>
              <Stack gap={4}>
                <Text size="sm"><strong>Name:</strong> {selectedBooking.customerName}</Text>
                <Text size="sm"><strong>Email:</strong> {selectedBooking.customerEmail}</Text>
                <Text size="sm"><strong>Phone:</strong> {selectedBooking.customerPhone}</Text>
              </Stack>
            </div>

            <div>
              <Text size="sm" fw={700} mb={4}>Participants</Text>
              <Stack gap={4}>
                <Text size="sm"><strong>Adults:</strong> {selectedBooking.adultCount}</Text>
                <Text size="sm"><strong>Children:</strong> {selectedBooking.childCount}</Text>
              </Stack>
            </div>

            <div>
              <Text size="sm" fw={700} mb={4}>Pricing</Text>
              <Stack gap={4}>
                <Text size="sm"><strong>Adult Price:</strong> {formatPrice(selectedBooking.adultPrice)}</Text>
                <Text size="sm"><strong>Child Price:</strong> {formatPrice(selectedBooking.childPrice)}</Text>
                <Text size="sm"><strong>Total Price:</strong> <Text span fw={700}>{formatPrice(selectedBooking.totalPrice)}</Text></Text>
              </Stack>
            </div>

            {selectedBooking.customerNotes && (
              <div>
                <Text size="sm" fw={700} mb={4}>Customer Notes</Text>
                <Text size="sm">{selectedBooking.customerNotes}</Text>
              </div>
            )}
          </Stack>
        )}
      </Modal>

      <Modal
        opened={deleteBookingModalOpened}
        onClose={() => setDeleteBookingModalOpened(false)}
        title="Confirm Delete"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this booking?</Text>
          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => setDeleteBookingModalOpened(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDeleteBooking}
              loading={isDeleting}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
