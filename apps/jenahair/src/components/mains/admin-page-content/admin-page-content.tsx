'use client';

import { Group, Text, Tabs } from '@mantine/core';
import { IBookingResponse } from '@/interfaces/booking-interface';
import { ICustomTourRequestResponse } from '@/interfaces/custom-tour-request-interface';
import { ICustomerContactResponse } from '@/interfaces/customer-contact-interface';
import classes from './admin-page-content.module.scss';
import BookingsTab from '../../tabs/bookings-tab';
import CustomTourRequestsTab from '../../tabs/custom-tour-requests-tab';
import CustomerContactsTab from '../../tabs/customer-contacts-tab';
import { use } from 'react';

interface AdminPageContentProps {
  bookingsPromise: Promise<IBookingResponse[]>;
  customTourRequestsPromise: Promise<ICustomTourRequestResponse[]>;
  customerContactsPromise: Promise<ICustomerContactResponse[]>;
}

export default function AdminPageContent({ bookingsPromise, customTourRequestsPromise, customerContactsPromise }: AdminPageContentProps) {
  const bookings = use(bookingsPromise);
  const customTourRequests = use(customTourRequestsPromise);
  const customerContacts = use(customerContactsPromise);
  return (
    <div className={classes.adminPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Dashboard</Text>
      </Group>

      <div className={classes.tabsWrapper}>
        <Tabs defaultValue="bookings">
          <Tabs.List>
            <Tabs.Tab value="bookings">
              Bookings ({bookings.length})
            </Tabs.Tab>
            <Tabs.Tab value="customized-tours">
              Customized Tours ({customTourRequests.length})
            </Tabs.Tab>
            <Tabs.Tab value="customer-contacts">
              Contacts ({customerContacts.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="bookings" pt="lg">
            <BookingsTab bookings={bookings} />
          </Tabs.Panel>

          <Tabs.Panel value="customized-tours" pt="lg">
            <CustomTourRequestsTab customTourRequests={customTourRequests} />
          </Tabs.Panel>

          <Tabs.Panel value="customer-contacts" pt="lg">
            <CustomerContactsTab customerContacts={customerContacts} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

