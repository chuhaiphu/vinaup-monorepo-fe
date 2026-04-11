import AdminMediaLayoutContent from "@/components/mains/admin-media-layout-content/admin-media-layout-content";

export default function AdminMediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminMediaLayoutContent>
      {children}
    </AdminMediaLayoutContent>
  );
}