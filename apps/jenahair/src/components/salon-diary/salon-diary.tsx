import { Container, Stack } from '@mantine/core';
import { DiaryGrid } from '@/components/diary-grid/diary-grid';
import { DiaryPost } from '@/mocks/salon-diary';
import classes from './salon-diary.module.scss';

export interface SalonDiaryProps {
    posts: DiaryPost[];
}

export function SalonDiary({ posts }: Readonly<SalonDiaryProps>) {
    return (
        <section>
            <Container size={1232}>
                <Stack gap="2rem">

                    {/* Phần Header */}
                    <div className={classes.header}>
                        <h2 className={classes.title}>Nhật ký cắt tóc nữ</h2>
                        <p className={classes.description}>
                            Tiệm tóc nữ quận Tân Phú được chị em truyền miệng vì “Tay nghề giỏi, tận tâm & sử dụng sản phẩm nhập khẩu tốt cho sức khỏe”. Chuyên chữa trị tóc hư tổn, cắt tóc tạo kiểu, tẩy tóc nhuộm màu thời trang...{' '}
                            <a href="#" className={classes.link}>Xem nhật ký</a>
                        </p>
                    </div>

                    {/* Phần Grid/Carousel hiển thị bài viết */}
                    <DiaryGrid posts={posts} />

                    <a href="#" className={classes.seeMore}>
                        Xem thêm
                    </a>
                </Stack>
            </Container>
        </section>
    );
}