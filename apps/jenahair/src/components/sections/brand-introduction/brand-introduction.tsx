import classes from './brand-introduction.module.scss';

export function BrandIntroduction() {
    return (
        <section className={classes.wrapper}>
            <div className={classes.inner}>
                <h1 className={classes.heading}>
                    <span className={classes.jena}>Jena</span>
                    <span className={classes.hair}>hair</span>
                </h1>
                <p className={classes.description}>
                    Jenahair là salon tóc nữ xuất thân từ nhà tạo mẫu tóc được cấp bằng chứng nhận bởi thầy Iwata nhà tạo mẫu tóc Nhật Bản & với tình yêu đam mê tóc & sắc đẹp, Jena Hair sẽ làm bạn lộng lẫy là sứ mệnh từng thành viên của salon
                </p>
            </div>
        </section>
    );
}