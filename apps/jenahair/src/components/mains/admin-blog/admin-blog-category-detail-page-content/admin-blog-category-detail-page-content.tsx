import { getAllBlogCategoriesActionPrivate, getAvailableSortOrdersActionPrivate, getBlogCategoryByIdActionPrivate } from "@/actions/blog-category-action";
import { notFound } from "next/navigation";
import AdminBlogCategoryDetailPageContentContainer from "./admin-blog-category-detail-page-content-container/admin-blog-category-detail-page-content-container";

interface AdminBlogCategoryDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogCategoryDetailPageContent({
  params
}: AdminBlogCategoryDetailPageContentProps) {
  const { id } = await params;

  const [currentBlogCategoryResponse, blogCategoriesResponse] = await Promise.all([
    getBlogCategoryByIdActionPrivate(id),
    getAllBlogCategoriesActionPrivate(),
  ]);
  const availableSortOrdersResponse = await getAvailableSortOrdersActionPrivate(currentBlogCategoryResponse.data?.parent?.id || '');

  if (!currentBlogCategoryResponse.success || !currentBlogCategoryResponse.data) {
    notFound();
  }

  return (
    <AdminBlogCategoryDetailPageContentContainer
      currentBlogCategory={currentBlogCategoryResponse.data}
      blogCategoriesData={blogCategoriesResponse.data ?? []}
      availableSortOrdersData={availableSortOrdersResponse.data ?? []}
    />
  );
}
