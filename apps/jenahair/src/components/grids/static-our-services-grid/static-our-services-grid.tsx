import { Grid, GridCol } from '@mantine/core';
import { ImageCard } from '@vinaup/ui/landing';
import { SERVICE_ITEMS } from '@/constants';

export default function StaticOurServicesGrid() {
  return (
    <Grid mb="3.5rem" gap="lg">
      {SERVICE_ITEMS.map((item, index) => (
        <GridCol span={{ base: 12, sm: 6, md: 3 }} key={item.name}>
          <ImageCard
            title={item.name}
            imageUrl={item.imageUrl}
            href={item.endpoint}
            variant="banner"
            // Only the first item should be priority to avoid flickering
            priority={index === 0}
          />
        </GridCol>
      ))}
    </Grid>
  );
}
