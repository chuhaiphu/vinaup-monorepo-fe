// import { Suspense } from 'react';
import { Container, Stack } from '@mantine/core';
import Link from 'next/link';
import { getAllDiariesActionPublic } from '@/actions/diary-action';
import DiaryGrid from '@/components/grids/diary-grid/diary-grid';
import classes from './salon-diary-section.module.scss';

async function SalonDiaryContent() {
  const result = await getAllDiariesActionPublic();
  const diaries = result.success ? (result.data ?? []).slice(0, 8) : [];

  return <DiaryGrid diaries={diaries} showPagination={false} />;
}

export async function SalonDiarySection() {
  // only use 'use cache' for landing page component only,
  // to prevent cucumulative layout shift.
  'use cache';

  return (
    <section>
      <Container size={'xl'}>
        <div className={classes.header}>
          <h2 className={classes.title}>Nhật ký cắt tóc & trang điểm</h2>
          <p className={classes.description}>
            Salon Jena được chị em truyền miệng vì “Tay nghề giỏi, tận tâm & sử dụng
            sản phẩm đến từ tự nhiên chính hãng tốt cho sức khỏe...”{' '}
            <Link href="/nhat-ky" className={classes.link} prefetch={true}>
              Xem nhật ký
            </Link>
          </p>
        </div>
        {/* <Suspense fallback={<DiaryGridSkeleton itemCount={8} />}> */}
        <SalonDiaryContent />
        {/* </Suspense> */}

        <Link href="/nhat-ky" className={classes.seeMore} prefetch={true}>
          Xem thêm
        </Link>
      </Container>
    </section>
  );
}
