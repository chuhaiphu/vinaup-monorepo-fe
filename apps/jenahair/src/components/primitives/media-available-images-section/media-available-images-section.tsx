import { getAllMediaActionPrivate } from "@/actions/media-action";
import { Stack, Text } from "@mantine/core";
import MediaImageGrid from "./media-image-grid";

export default async function MediaAvailableImagesSection() {
  const mediaResponse = await getAllMediaActionPrivate();
  const images = (mediaResponse?.data ?? []).filter((media) => media.type === 'image');

  if (images.length === 0) {
    return (
      <div>
        <Text c="dimmed">No images available</Text>
      </div>
    );
  }

  return (
    <Stack gap="sm">
      <MediaImageGrid images={images} />
    </Stack>
  );
}