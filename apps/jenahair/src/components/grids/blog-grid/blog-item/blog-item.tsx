import { Card, Text, Group, Stack, Avatar } from "@mantine/core";
import classes from "./blog-item.module.scss";
import { IBlogResponse } from "@/interfaces/blog-interface";
import dayjs from "dayjs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import Image from "next/image";
import { OverlayCard } from "@vinaup/ui/landing";

interface BlogItemProps {
  item: {
    id: string;
    title: string;
    mainImageUrl: string | null;
    description: string | null;
    endpoint: string;
    blogCategoryBlogs: IBlogResponse['blogCategoryBlogs'];
    createdAt: Date;
    createdBy: IBlogResponse['createdBy'];
  };
}

export default function BlogItem({ item }: BlogItemProps) {
  // const renderCategories = () => {
  //   if (!item.blogCategoryBlogs || item.blogCategoryBlogs.length === 0) {
  //     return null;
  //   }

  //   const categories = item.blogCategoryBlogs
  //     .map(bcb => bcb.blogCategory?.title)
  //     .filter(Boolean)
  //     .slice(0, 2); // Show max 2 categories

  //   if (categories.length === 0) {
  //     return null;
  //   }

  //   return (
  //     <Text className={classes.categories} size="sm" c={'#F9F9F9'} lineClamp={1}>
  //       {categories.join(', ')}
  //     </Text>
  //   );
  // };

  // const renderAuthor = () => {
  //   if (!item.createdBy) {
  //     return null;
  //   }

  //   const avatarLetter = item.createdBy.email?.charAt(0).toUpperCase() || 'U';
  //   const authorName = item.createdBy.name || item.createdBy.email || 'Unknown';

  //   return (
  //     <Group gap={8}>
  //       <Avatar radius="xl" size={32} color="cyan" bg={'white'}>
  //         {avatarLetter}
  //       </Avatar>
  //       <Text className={classes.author} size="sm" c={'#F9F9F9'} lineClamp={1}>
  //         {authorName}
  //       </Text>
  //     </Group>
  //   );
  // };

  // const renderDate = () => {
  //   const date = typeof item.createdAt === 'string' ? new Date(item.createdAt) : item.createdAt;
  //   return (
  //     <Text className={classes.date} size="sm" c={'#F9F9F9'}>
  //       {dayjs(date).format('DD/MM/YYYY')}
  //     </Text>
  //   );
  // };

  // return (
  //   <Card className={classes.blogItem} padding={0} bg={'transparent'}>
  //     <div className={classes.imageWrapper}>
  //       <Image
  //         fill
  //         src={item.mainImageUrl || "/images/image-placeholder.png"}
  //         alt={item.title}
  //         className={classes.image}
  //       />
  //     </div>

  //     <Stack className={classes.content} gap="xs" p="sm" pt={'lg'}>
  //       <Text className={classes.title} fw={'400'} c={'#00E1FF'} lineClamp={2} component="h3" fz={'lg'}
  //         styles={{ root: { lineHeight: 1.5, minHeight: '3em' } }}
  //       >
  //         {item.title}
  //       </Text>

  //       <Group justify="space-between" align="center">
  //         <Group>
  //           {item.createdBy && (
  //             renderAuthor()
  //           )}
  //         </Group>

  //         <Group gap={'xs'}>
  //           {renderDate()}
  //           <MdOutlineCalendarMonth size={22} color="#00E1FF" />
  //         </Group>
  //       </Group>
  //     </Stack>
  //   </Card>

  return (
    <OverlayCard title={item.title} src={item.mainImageUrl || "/images/image-placeholder.png"} />
  )
}

