'use client';

import { Group, Text, Stack, Modal, ActionIcon, Button } from '@mantine/core';
import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { EntitiesTable } from '@vinaup/ui/admin';
import { EntitiesTableColumnProps } from '@vinaup/ui/admin';
import { ICustomTourRequestResponse } from '@/interfaces/custom-tour-request-interface';
import { HotelTypeDisplayMap, RoomTypeDisplayMap } from '@/constants';
import { SlOptionsVertical } from 'react-icons/sl';
import { deleteCustomTourRequestActionPrivate } from '@/actions/custom-tour-request-action';
import { notifications } from '@mantine/notifications';
import { GrTrash } from 'react-icons/gr';
import classes from './custom-tour-requests-tab.module.scss';

interface CustomTourRequestsTabProps {
  customTourRequests: ICustomTourRequestResponse[];
}

export default function CustomTourRequestsTab({ customTourRequests }: CustomTourRequestsTabProps) {
  const [detailModalOpened, setDetailModalOpened] = useState(false);
  const [selectedCustomTour, setSelectedCustomTour] = useState<ICustomTourRequestResponse | null>(null);
  const [deleteCustomTourModalOpened, setDeleteCustomTourModalOpened] = useState(false);
  const [customTourToDelete, setCustomTourToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleViewDetails = (customTour: ICustomTourRequestResponse) => {
    setSelectedCustomTour(customTour);
    setDetailModalOpened(true);
  };

  const handleOpenDeleteCustomTourModal = (customTourId: string) => {
    setCustomTourToDelete(customTourId);
    setDeleteCustomTourModalOpened(true);
  };

  const handleDeleteCustomTour = async () => {
    if (!customTourToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteCustomTourRequestActionPrivate(customTourToDelete);
      if (result.success) {
        notifications.show({
          title: 'Success',
          message: 'Customized tour request deleted successfully',
          color: 'green',
        });
        setDeleteCustomTourModalOpened(false);
        setCustomTourToDelete(null);
      } else {
        notifications.show({
          title: 'Error',
          message: result.error || 'Failed to delete customized tour request',
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

  const customTourColumns: EntitiesTableColumnProps<ICustomTourRequestResponse>[] = [
    {
      key: 'customer',
      width: '30%',
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
      key: 'dates',
      width: '15%',
      header: 'Travel Dates',
      headerAlign: 'left',
      cellAlign: 'left',
      render: ({ entity }) => (
        <Stack gap={4}>
          <Text size="sm">From: {formatDate(entity.startDate)}</Text>
          <Text size="sm">To: {formatDate(entity.endDate)}</Text>
        </Stack>
      ),
    },
    {
      key: 'destinations',
      width: '30%',
      header: 'Destinations',
      headerAlign: 'left',
      cellAlign: 'left',
      render: ({ entity }) => (
        <Text size="sm" lineClamp={2}>
          {entity.destinations.join(', ')}
        </Text>
      ),
    },
    {
      key: 'actions',
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
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="transparent"
            onClick={() => handleOpenDeleteCustomTourModal(entity.id)}
          >
            <GrTrash size={20} color="#01426e" />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            onClick={() => handleViewDetails(entity)}
          >
            <IoEyeOutline size={24} color="#01426e" />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <>
      {customTourRequests.length > 0 ? (
        <EntitiesTable
          data={customTourRequests}
          columns={customTourColumns}
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
          No customized tour requests found
        </Text>
      )}

      <Modal
        opened={detailModalOpened}
        onClose={() => setDetailModalOpened(false)}
        title="Customized Tour Request Details"
        size="lg"
        centered
      >
        {selectedCustomTour && (
          <Stack gap="md">
            <div>
              <Text size="sm" fw={700} mb={4}>Customer Information</Text>
              <Stack gap={4}>
                <Text size="sm"><strong>Name:</strong> {selectedCustomTour.customerName}</Text>
                <Text size="sm"><strong>Email:</strong> {selectedCustomTour.customerEmail}</Text>
                <Text size="sm"><strong>Phone:</strong> {selectedCustomTour.customerPhone}</Text>
              </Stack>
            </div>

            <div>
              <Text size="sm" fw={700} mb={4}>Travel Information</Text>
              <Stack gap={4}>
                <Text size="sm"><strong>Start Date:</strong> {formatDate(selectedCustomTour.startDate)}</Text>
                <Text size="sm"><strong>End Date:</strong> {formatDate(selectedCustomTour.endDate)}</Text>
                <Text size="sm"><strong>Adults:</strong> {selectedCustomTour.adultCount}</Text>
                <Text size="sm"><strong>Children:</strong> {selectedCustomTour.childCount}</Text>
              </Stack>
            </div>

            <div>
              <Text size="sm" fw={700} mb={4}>Destinations</Text>
              <Text size="sm">{selectedCustomTour.destinations.join(', ')}</Text>
            </div>

            {selectedCustomTour.tourCategoryCustomTourRequests && selectedCustomTour.tourCategoryCustomTourRequests.length > 0 && (
              <div>
                <Text size="sm" fw={700} mb={4}>Tour Categories</Text>
                <Text size="sm">
                  {selectedCustomTour.tourCategoryCustomTourRequests
                    .map(tcctr => tcctr.tourCategory?.title)
                    .filter(Boolean)
                    .join(', ')}
                </Text>
              </div>
            )}

            {(selectedCustomTour.hotelType || selectedCustomTour.roomType) && (
              <div>
                <Text size="sm" fw={700} mb={4}>Accommodation</Text>
                <Stack gap={4}>
                  {selectedCustomTour.hotelType && (
                    <Text size="sm"><strong>Hotel Type:</strong> {HotelTypeDisplayMap[selectedCustomTour.hotelType] || selectedCustomTour.hotelType}</Text>
                  )}
                  {selectedCustomTour.roomType && (
                    <Text size="sm"><strong>Room Type:</strong> {RoomTypeDisplayMap[selectedCustomTour.roomType] || selectedCustomTour.roomType}</Text>
                  )}
                </Stack>
              </div>
            )}

            {selectedCustomTour.customerNotes && (
              <div>
                <Text size="sm" fw={700} mb={4}>Special Request</Text>
                <Text size="sm">{selectedCustomTour.customerNotes}</Text>
              </div>
            )}
          </Stack>
        )}
      </Modal>

      <Modal
        opened={deleteCustomTourModalOpened}
        onClose={() => setDeleteCustomTourModalOpened(false)}
        title="Confirm Delete"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this customized tour request?</Text>
          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => setDeleteCustomTourModalOpened(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDeleteCustomTour}
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
