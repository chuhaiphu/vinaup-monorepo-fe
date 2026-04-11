'use client';
import { ITourResponse } from '@/interfaces/tour-interface';
import { Grid, GridCol, Pagination } from '@mantine/core';
import TourItem from './tour-item/tour-item';
import Link from 'next/link';
import classes from './tour-grid-content.module.scss';
import { useState } from 'react';

export default function TourGridContent({
  toursData,
  pageSize = 16,
}: {
  toursData: ITourResponse[];
  pageSize?: number;
}) {
  const [page, setPage] = useState(1);
  const total = toursData.length;
  // Example: total = 17, pageSize = 16 -> totalPages = 2
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const getPaginatedData = () => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return toursData.slice(start, end);
  };

  return (
    <>
      <Grid mt={'lg'} mb={'md'} gap="lg">
        {getPaginatedData().map((item) => (
          <GridCol span={{ base: 12, sm: 6, md: 3 }} key={item.id}>
            <Link href={`/tours/${item.endpoint}`} className={classes.cardLink}>
              <TourItem item={item} />
            </Link>
          </GridCol>
        ))}
      </Grid>
      {totalPages > 1 && (
        <div className={classes.paginationWrapper}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
        </div>
      )}
    </>
  );
}
