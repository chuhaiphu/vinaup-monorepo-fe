import { Suspense } from 'react';
import { Container, Stack } from '@mantine/core';
import Link from 'next/link';
import { getAllDiariesActionPublic } from '@/actions/diary-action';
import DiaryGrid from '@/components/grids/diary-grid/diary-grid';
import DiaryGridSkeleton from '@/components/grids/diary-grid/diary-grid-skeleton';
import classes from './salon-diary-section.module.scss';

async function SalonDiaryContent() {
  const result = await getAllDiariesActionPublic();
  const diaries = result.success ? (result.data ?? []).slice(0, 8) : [];

  return <DiaryGrid diaries={diaries} showPagination={false} />;
}

export function SalonDiarySection() {
  return (
    <section>
      <Container size={'xl'}>
        <Stack gap="2rem">
          <div className={classes.header}>
            <h2 className={classes.title}>Nhật ký cắt tóc nữ</h2>
            <p className={classes.description}>
              Tiệm tóc nữ quận Tân Phú được chị em truyền miệng vì &ldquo;Tay nghề
              giỏi, tận tâm &amp; sử dụng sản phẩm nhập khẩu tốt cho sức
              khỏe&rdquo;. Chuyên chữa trị tóc hư tổn, cắt tóc tạo kiểu, tẩy tóc
              nhuộm màu thời trang...{' '}
              <Link href="/nhat-ky" className={classes.link} prefetch={true}>
                Xem nhật ký
              </Link>
            </p>
          </div>

          <Suspense fallback={<DiaryGridSkeleton itemCount={8} />}>
            <SalonDiaryContent />
          </Suspense>

          <Link href="/nhat-ky" className={classes.seeMore} prefetch={true}>
            Xem thêm
          </Link>
        </Stack>
      </Container>
    </section>
  );
}
