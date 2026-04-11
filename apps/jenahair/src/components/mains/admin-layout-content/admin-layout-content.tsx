import { getMeActionPrivate } from "@/actions/auth-action";
import AdminLayoutContainer from "@/components/mains/admin-layout-content/admin-layout-content-container/admin-layout-content-container";
import { redirect } from "next/navigation";

interface AdminLayoutContentProps {
  children: React.ReactNode;
}

export default async function AdminLayoutContent({ children }: AdminLayoutContentProps) {
  const result = await getMeActionPrivate();

  if (!result.success || !result.data) {
    redirect('/login?invalid=1')
  }

  return (
    <AdminLayoutContainer userData={result.data}>
      {children}
    </AdminLayoutContainer>
  );
}
