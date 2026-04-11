import { getMediaByIdActionPrivate } from "@/actions/media-action";
import { notFound } from "next/navigation";
import AdminMediaImageDetailSection from "@/components/primitives/admin-media-image-detail-section/admin-media-image-detail-section";

export default async function AdminMediaImageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mediaResponse = await getMediaByIdActionPrivate(id);

  if (!mediaResponse.success || !mediaResponse.data) {
    notFound();
  }

  const image = mediaResponse.data;

  return <AdminMediaImageDetailSection image={image} />;
}
