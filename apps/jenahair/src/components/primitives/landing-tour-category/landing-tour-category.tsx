import { getTourCategoryToursByTourCategoryIdActionPublic } from '@/actions/tour-category-tour-action';
import TourGrid from '@/components/grids/tour-grid/tour-grid';
import { ITourCategoryResponse } from '@/interfaces/tour-category-interface';
import { ITourResponse } from '@/interfaces/tour-interface';
import { Stack } from '@mantine/core';
import { VideoSection } from '@vinaup/ui/landing';
import classes from './landing-tour-category.module.scss';

interface LandingTourCategoryProps {
  category: ITourCategoryResponse;
  queryParams: {
    q?: string;
    type?: string;
    destinations?: string;
  };
}

export default async function LandingTourCategory({
  category,
  queryParams,
}: LandingTourCategoryProps) {
  // Get all tours in this category
  const tourCategoryToursResponse =
    await getTourCategoryToursByTourCategoryIdActionPublic(category.id);

  // Extract tours and filter only public ones
  const toursFromTourCategory: ITourResponse[] =
    tourCategoryToursResponse.success && tourCategoryToursResponse.data
      ? tourCategoryToursResponse.data
          .map((tct) => tct.tour)
          .filter(
            (tour): tour is ITourResponse =>
              tour !== undefined && tour.visibility === 'public'
          )
      : [];

  const sortedTours = toursFromTourCategory
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const renderHTMLDescription = (htmlDescription: string | null) => {
    if (
      !htmlDescription ||
      htmlDescription.trim() === '' ||
      htmlDescription.trim() === '<p></p>'
    ) {
      return null;
    }
    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlDescription }}
        className={classes.htmlDescription}
      ></div>
    );
  };
  const renderVideoSection = (
    videoUrl?: string,
    thumbnailUrl?: string,
    title?: string
  ) => {
    if (!videoUrl) {
      return <></>;
    }
    return (
      <VideoSection
        url={videoUrl}
        title={title}
        height={480}
        thumbnailUrl={thumbnailUrl || undefined}
      />
    );
  };

  return (
    <Stack gap={'xs'} mb={'lg'}>
      <h1 className={classes.sectionTitle}>{category.title}</h1>
      {category.videoPosition === 'top' &&
        renderVideoSection(
          category.videoUrl || undefined,
          category.videoThumbnailUrl || undefined,
          category.title
        )}
      {renderHTMLDescription(category.description)}
      <TourGrid
        queryParams={{
          q: queryParams.q,
          type: queryParams.type,
          destinations: queryParams.destinations,
        }}
        toursData={sortedTours}
      />
      {category.videoPosition === 'bottom' &&
        renderVideoSection(
          category.videoUrl || undefined,
          category.videoThumbnailUrl || undefined,
          category.title
        )}
    </Stack>
  );
}
