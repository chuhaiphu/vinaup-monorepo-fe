import { getBlogCategoryByEndpointActionPublic } from '@/actions/blog-category-action';
import LandingBlogCategory from '@/components/primitives/landing-blog-category/landing-blog-category';
import SearchBar from '@/components/primitives/search-bar/search-bar';
import LandingTourCategory from '@/components/primitives/landing-tour-category/landing-tour-category';
import { notFound } from 'next/navigation';
import { getTourCategoryByEndpointActionPublic } from '@/actions/tour-category-action';
import { getPageByEndpointActionPublic } from '@/actions/page-action';
import LandingPageDetail from '@/components/primitives/landing-page-detail/landing-page-detail';
import { Suspense } from 'react';
import { Loader } from '@mantine/core';

export default async function DynamicPageContent({
  params,
  searchParams,
}: {
  params: Promise<{ endpoint: string }>;
  searchParams: Promise<{ q?: string; type?: string; destinations?: string }>;
}) {
  const { endpoint } = await params;
  const queryParams = await searchParams;

  // If endpoint is a blog category, return the blog category page
  const blogCategoryResponse =
    await getBlogCategoryByEndpointActionPublic(endpoint);
  if (blogCategoryResponse.success && blogCategoryResponse.data) {
    return (
      <>
        <SearchBar />
        <Suspense fallback={<Loader size={64} />}>
          <LandingBlogCategory
            category={blogCategoryResponse.data}
            queryParams={{
              q: queryParams.q,
              destinations: queryParams.destinations,
            }}
          />
        </Suspense>
      </>
    );
  }

  // If endpoint is a tour category, return the tour category page
  const tourCategoryResponse =
    await getTourCategoryByEndpointActionPublic(endpoint);
  if (tourCategoryResponse.success && tourCategoryResponse.data) {
    return (
      <>
        <SearchBar />
        <Suspense fallback={<Loader size={64} />}>
          <LandingTourCategory
            category={tourCategoryResponse.data}
            queryParams={queryParams}
          />
        </Suspense>
      </>
    );
  }

  // If endpoint is a page, return the page detail page
  const pageResponse = await getPageByEndpointActionPublic(endpoint);
  if (pageResponse.success && pageResponse.data) {
    return (
      <>
        <SearchBar />
        <LandingPageDetail page={pageResponse.data} />
      </>
    );
  }

  // Neither found
  notFound();
}
