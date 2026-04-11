import { ITourResponse } from "@/interfaces/tour-interface";
import { Text } from "@mantine/core";
import TourGridContent from "./tour-grid-content";

export default function TourGrid(
  { queryParams, toursData }: {
    queryParams?: {
      q?: string,
      type?: string,
      destinations?: string,
    },
    toursData: ITourResponse[]
  }
) {

  if (!toursData || toursData.length === 0) {
    return <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
      No tours available
    </Text>;
  }


  const searchQuery = queryParams?.q;
  const typeFilter = queryParams?.type;
  const destinationsFilter = queryParams?.destinations;

  let filtered = toursData;

  // Filter by type
  if (typeFilter && typeFilter !== 'all') {
    filtered = filtered.filter((tour) =>
      tour.type?.toLowerCase() === typeFilter.toLowerCase()
    );
  }

  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter((tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by destinations
  if (destinationsFilter) {
    const selectedDestinations = destinationsFilter.split(',').filter(Boolean);
    if (selectedDestinations.length > 0) {
      filtered = filtered.filter((tour) =>
        selectedDestinations.some((dest) =>
          tour.destinations.some((tourDest) =>
            tourDest.toLowerCase().includes(dest.toLowerCase())
          )
        )
      );
    }
  }

  if (filtered.length === 0) {
    return (
      <Text c={'#F9F9F9'} fz="xl" ta="center" mt="xl">
        There are no tours matching your criteria.
      </Text>
    );
  }

  return (
    <TourGridContent toursData={filtered} />
  );
}