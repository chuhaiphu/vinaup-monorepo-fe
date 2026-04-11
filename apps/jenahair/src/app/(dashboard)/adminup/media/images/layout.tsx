import MediaAvailableImagesSection from "@/components/primitives/media-available-images-section/media-available-images-section";
import { Grid, GridCol } from "@mantine/core";

export default function AdminMediaImagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid>
      <GridCol span={9}>
        <MediaAvailableImagesSection />
      </GridCol>
      <GridCol span={3}>
        {children}
      </GridCol>
    </Grid>
  );
}