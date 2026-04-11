import { getAllBlogsActionPrivate } from "@/actions/blog-action";
import { getMeActionPrivate } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import AdminBlogPageContentContainer from "./admin-blog-page-content-container/admin-blog-page-content-container";

export default async function AdminBlogPageContent() {
  const blogsData = await getAllBlogsActionPrivate();
  const meResult = await getMeActionPrivate();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  return (
    <AdminBlogPageContentContainer
      blogsData={blogsData?.data ?? []}
      userData={meResult.data}
    />
  );
}
