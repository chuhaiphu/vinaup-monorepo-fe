import { getAllBookingsActionPrivate } from '@/actions/booking-action';
import { getAllCustomTourRequestsActionPrivate } from '@/actions/custom-tour-request-action';
import { getAllCustomerContactsActionPrivate } from '@/actions/customer-contact-action';
import AdminPageContent from '../../../components/mains/admin-page-content/admin-page-content';
import { Suspense } from 'react';

export default async function AdminPage() {
  const bookingsResultPromise = getAllBookingsActionPrivate().then((res) => res.data || []);
  const customTourRequestsResultPromise = getAllCustomTourRequestsActionPrivate().then((res) => res.data || []);
  const customerContactsResultPromise = getAllCustomerContactsActionPrivate().then((res) => res.data || []);

  return (
    <Suspense>
      <AdminPageContent
        bookingsPromise={bookingsResultPromise}
        customTourRequestsPromise={customTourRequestsResultPromise}
        customerContactsPromise={customerContactsResultPromise}
      />
    </Suspense>
  );
}