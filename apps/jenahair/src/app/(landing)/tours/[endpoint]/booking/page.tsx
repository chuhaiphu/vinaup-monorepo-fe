import { getTourByEndpointActionPublic } from '@/actions/tour-action';
import { notFound } from 'next/navigation';
import SearchBar from '@/components/primitives/search-bar/search-bar';
import { Group, Title, Box } from '@mantine/core';
import { IoChevronBack } from 'react-icons/io5';
import Link from 'next/link';
import classes from './page.module.scss';
import TourDetailBookingPageContent from '@/components/mains/tour-detail-booking-page/tour-detail-booking-page-content';

interface TourDetailBookingPageProps {
  params: Promise<{ endpoint: string }>;
}

export default async function TourDetailBookingPage({
  params,
}: TourDetailBookingPageProps) {
  const { endpoint } = await params;
  const tourResponse = await getTourByEndpointActionPublic(endpoint);

  if (!tourResponse.success || !tourResponse.data) {
    notFound();
  }

  return (
    <>
      <SearchBar />
      <Group justify="space-between" align="center" mb={'lg'}>
        <Group align="center" gap={4}>
          <Link
            href={`/tours/${tourResponse.data.endpoint}`}
            className={classes.backIcon}
          >
            <IoChevronBack size={20} />
          </Link>
          <Link
            href={`/tours/${tourResponse.data.endpoint}`}
            className={classes.backButton}
          >
            Back
          </Link>
        </Group>
        <Title order={3} ta="center" className={classes.pageTitle} c={'white'}>
          Booking Tours
        </Title>
        <Box w={100} />
      </Group>
      <TourDetailBookingPageContent tourData={tourResponse.data} />
    </>
  );
}
