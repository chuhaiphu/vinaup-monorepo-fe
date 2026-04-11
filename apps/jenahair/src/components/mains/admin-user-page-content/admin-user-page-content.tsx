import { getAllUsersActionPrivate } from "@/actions/user-action";
import { getMeActionPrivate } from "@/actions/auth-action";
import { redirect } from "next/navigation";
import AdminUserPageContentContainer from "./admin-user-page-content-container/admin-user-page-content-container";

export default async function AdminUserPageContent() {
  const usersData = await getAllUsersActionPrivate();
  const meResult = await getMeActionPrivate();

  if (!meResult.success || !meResult.data) {
    redirect('/login');
  }

  // Only superadmin can access this page
  if (meResult.data.role !== 'supadmin') {
    redirect('/adminup');
  }

  return (
    <AdminUserPageContentContainer
      usersData={usersData ?? []}
      userData={meResult.data}
    />
  );
}
