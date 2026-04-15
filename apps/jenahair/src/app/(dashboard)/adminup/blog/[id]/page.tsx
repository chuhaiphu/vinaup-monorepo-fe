import AdminBlogDetailPageContent from '@/components/mains/admin-blog/admin-blog-detail-page-content/admin-blog-detail-page-content';
import { getBlogByIdActionPrivate } from '@/actions/blog-action';
import { getAllBlogCategoriesActionPrivate } from '@/actions/blog-category-action';
import { Suspense } from 'react';

export default function AdminBlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentBlogPromise = params.then((params) =>
    getBlogByIdActionPrivate(params.id)
  );
  const blogCategoriesPromise = getAllBlogCategoriesActionPrivate();

  return (
    <Suspense>
      <AdminBlogDetailPageContent
        currentBlogPromise={currentBlogPromise}
        blogCategoriesPromise={blogCategoriesPromise}
      />
    </Suspense>
  );
}
