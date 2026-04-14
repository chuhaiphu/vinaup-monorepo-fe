import { getBlogByIdActionPrivate } from "@/actions/blog-action";
import { getAllBlogCategoriesActionPrivate } from "@/actions/blog-category-action";
import { getMeActionPrivate } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import AdminBlogDetailPageContentContainer from "./admin-blog-detail-page-content-container/admin-blog-detail-page-content-container";

interface AdminBlogDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogDetailPageContent({
  params
}: AdminBlogDetailPageContentProps) {
  const { id } = await params;
  const meResult = await getMeActionPrivate();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  const [currentBlogResponse, blogCategoriesResponse] = await Promise.all([
    getBlogByIdActionPrivate(id),
    getAllBlogCategoriesActionPrivate(),
  ]);

  if (!currentBlogResponse.success || !currentBlogResponse.data) {
    return <div>Blog not found</div>;
  }

  return (
    <AdminBlogDetailPageContentContainer
      currentBlogData={currentBlogResponse.data}
      blogCategoriesData={blogCategoriesResponse.data ?? []}
      userData={meResult.data}
    />
  );
}
