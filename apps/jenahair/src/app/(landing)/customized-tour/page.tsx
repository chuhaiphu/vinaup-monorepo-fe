import { getAllTourCategoriesActionPublic } from '@/actions/tour-category-action';
import CustomizedTourPageContainer from '@/components/mains/customized-tour-page/customize-tour-page-container';
import SearchBar from '@/components/primitives/search-bar/search-bar';
import { Box, Group, Title } from '@mantine/core';
import { IoChevronBack } from 'react-icons/io5';
import Link from 'next/link';
import classes from './page.module.scss';

export default async function CustomizedTourPage() {
  const tourCategoriesResponse = await getAllTourCategoriesActionPublic();
  const tourCategoriesData =
    tourCategoriesResponse.success && tourCategoriesResponse.data
      ? tourCategoriesResponse.data
      : [];

  return (
    <div className={classes.customizedTourPageRoot}>
      <SearchBar />
      <Group justify="space-between" align="center" mb={'lg'}>
        <Group align="center" gap={4}>
          <Link href="/" className={classes.backIcon}>
            <IoChevronBack size={20} />
          </Link>
          <Link href="/" className={classes.backButton}>
            Back
          </Link>
        </Group>
        <Title order={3} ta="center" className={classes.pageTitle} c={'white'}>
          Customized Tour
        </Title>
        <Box w={100} />
      </Group>
      <CustomizedTourPageContainer tourCategoriesData={tourCategoriesData} />
    </div>
  );
}
