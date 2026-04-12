import { Box } from '@mantine/core';
import { SplitSectionHeader } from '@vinaup/ui/landing';
import {
  GridCarousel,
  GridCarouselItem,
} from '@vinaup/ui/landing';

export type TourTypeItem = GridCarouselItem;

interface TourTypesProps {
  data: TourTypeItem[];
}

export function TourTypes({ data }: TourTypesProps) {
  return (
    <Box component="section">
      <SplitSectionHeader
        title="Vietnam tour types"
        description="The Local Travel is your premier destination, where we showcase a wide variety of tours offered by carefully selected and trusted travel agents."
      />

      <GridCarousel items={data} />
    </Box>
  );
}
