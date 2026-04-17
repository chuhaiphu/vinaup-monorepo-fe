'use client';

import { Group, Text, Stack, Modal, ActionIcon, Button } from '@mantine/core';
import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import { EntitiesTable } from '@vinaup/ui/admin';
import { EntitiesTableColumnProps } from '@vinaup/ui/admin';
import { ICustomerContactResponse } from '@/interfaces/customer-contact-interface';
import { SlOptionsVertical } from 'react-icons/sl';
import { deleteCustomerContactActionPrivate } from '@/actions/customer-contact-action';
import { notifications } from '@mantine/notifications';
import { GrTrash } from 'react-icons/gr';
import classes from './customer-contacts-tab.module.scss';

interface CustomerContactsTabProps {
  customerContacts: ICustomerContactResponse[];
}

export default function CustomerContactsTab({ customerContacts }: CustomerContactsTabProps) {
  const [contactDetailModalOpened, setContactDetailModalOpened] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ICustomerContactResponse | null>(null);
  const [deleteContactModalOpened, setDeleteContactModalOpened] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handleViewContactDetails = (contact: ICustomerContactResponse) => {
    setSelectedContact(contact);
    setContactDetailModalOpened(true);
  };

  const handleOpenDeleteContactModal = (contactId: string) => {
    setContactToDelete(contactId);
    setDeleteContactModalOpened(true);
  };

  const handleDeleteContact = async () => {
    if (!contactToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteCustomerContactActionPrivate(contactToDelete);
      if (result.success) {
        notifications.show({
          title: 'Success',
          message: 'Customer contact deleted successfully',
          color: 'green',
        });
        setDeleteContactModalOpened(false);
        setContactToDelete(null);
      } else {
        notifications.show({
          title: 'Error',
          message: result.error || 'Failed to delete customer contact',
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

  const customerContactColumns: EntitiesTableColumnProps<ICustomerContactResponse>[] = [
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
              {entity.name}
            </Text>
          </Group>

          <Group gap={4}>
            <Text size="sm" c='dimmed'>
              Email:
            </Text>
            <Text size="sm" fw={500}>
              {entity.email}
            </Text>
          </Group>
        </Stack>
      ),
    },
    {
      key: 'phone',
      width: '15%',
      header: 'Phone',
      headerAlign: 'left',
      cellAlign: 'left',
      render: ({ entity }) => (
        <Text size="sm" fw={500}>
          {entity.phone}
        </Text>
      ),
    },
    {
      key: 'message',
      width: '35%',
      header: 'Message',
      headerAlign: 'left',
      cellAlign: 'left',
      render: ({ entity }) => (
        <Text size="sm" lineClamp={2}>
          {entity.notes || 'N/A'}
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
            onClick={() => handleOpenDeleteContactModal(entity.id)}
          >
            <GrTrash size={20} color="#01426e" />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            onClick={() => handleViewContactDetails(entity)}
          >
            <IoEyeOutline size={24} color="#01426e" />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  return (
    <>
      {customerContacts.length > 0 ? (
        <EntitiesTable
          data={customerContacts}
          columns={customerContactColumns}
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
          No customer contacts found
        </Text>
      )}

      <Modal
        opened={contactDetailModalOpened}
        onClose={() => setContactDetailModalOpened(false)}
        title="Customer Contact Details"
        size="lg"
        centered
      >
        {selectedContact && (
          <Stack gap="md">
            <div>
              <Text size="sm" fw={700} mb={4}>Customer Information</Text>
              <Stack gap={4}>
                <Text size="sm"><strong>Name:</strong> {selectedContact.name}</Text>
                <Text size="sm"><strong>Email:</strong> {selectedContact.email}</Text>
                <Text size="sm"><strong>Phone:</strong> {selectedContact.phone}</Text>
              </Stack>
            </div>

            {selectedContact.notes && (
              <div>
                <Text size="sm" fw={700} mb={4}>Message</Text>
                <Text size="sm">{selectedContact.notes}</Text>
              </div>
            )}

            <div>
              <Text size="sm" fw={700} mb={4}>Created At</Text>
              <Text size="sm">{formatDate(selectedContact.createdAt)}</Text>
            </div>
          </Stack>
        )}
      </Modal>

      <Modal
        opened={deleteContactModalOpened}
        onClose={() => setDeleteContactModalOpened(false)}
        title="Confirm Delete"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this customer contact?</Text>
          <Group justify="flex-end" mt="sm">
            <Button
              variant="default"
              onClick={() => setDeleteContactModalOpened(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDeleteContact}
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
