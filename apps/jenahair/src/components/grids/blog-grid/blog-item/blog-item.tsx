import { Group } from '@mantine/core';
import classes from './blog-item.module.scss';
import { IBlogResponse } from '@/interfaces/blog-interface';
import Image from 'next/image';
import { VinaupHeartIcon, VinaupEyeIcon } from '@vinaup/ui/cores';

interface BlogItemProps {
  item: IBlogResponse;
}

export default function BlogItem({ item }: BlogItemProps) {
  return (
    <div className={classes.blogCardWrapper}>
      {/* KHỐI ẢNH BÊN TRÁI */}
      <div className={classes.imageWrapper}>
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          src={item.mainImageUrl || '/images/image-placeholder.png'}
          alt={item.title}
          className={classes.image}
        />
      </div>

      {/* KHỐI NỘI DUNG BÊN PHẢI */}
      <div className={classes.content}>
        <h3 className={classes.title} title={item.title}>
          {item.title}
        </h3>

        <Group gap="1rem" className={classes.meta}>
          <Group gap="0.5rem" align="center">
            <VinaupHeartIcon fill="#99AB89" />
            <span>{item.likes < 10 ? `0${item.likes}` : item.likes}</span>
          </Group>
          <Group gap="0.5rem" align="center">
            <VinaupEyeIcon stroke="#99AB89" />
            <span>{item.views < 10 ? `0${item.views}` : item.views}</span>
          </Group>
        </Group>
      </div>
    </div>
  );
}
