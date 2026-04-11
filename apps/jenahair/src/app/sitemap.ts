import { MetadataRoute } from 'next';
import { getAllToursActionPublic } from '../actions/tour-action';
import { getAllBlogsActionPublic } from '../actions/blog-action';
import { getAllPagesVisibleActionPrivate } from '../actions/page-action';
import { getAllTourCategoriesActionPublic } from '../actions/tour-category-action';
import { getAllBlogCategoriesActionPrivate } from '../actions/blog-category-action';
import { SERVICE_ITEMS } from '@/constants';

const BASE_URL = 'https://jenahair.com';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tours`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/customized-tour`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    // Service pages
    ...SERVICE_ITEMS.map((service) => ({
      url: `${BASE_URL}${service.endpoint}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Dynamic routes from database
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    // Get all public tours
    const toursResponse = await getAllToursActionPublic();
    if (toursResponse.success && toursResponse.data) {
      toursResponse.data.forEach((tour) => {
        dynamicRoutes.push({
          url: `${BASE_URL}/tours/${tour.endpoint}`,
          lastModified: tour.startDate,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
        // Add booking page for each tour
        dynamicRoutes.push({
          url: `${BASE_URL}/tours/${tour.endpoint}/booking`,
          lastModified: tour.startDate,
          changeFrequency: 'monthly' as const,
          priority: 0.64,
        });
      });
    }

    // Get all public blogs
    const blogsResponse = await getAllBlogsActionPublic();
    if (blogsResponse.success && blogsResponse.data) {
      blogsResponse.data.forEach((blog) => {
        dynamicRoutes.push({
          url: `${BASE_URL}/blogs/${blog.endpoint}`,
          lastModified: blog.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
      });
    }

    // Get all public pages
    const pagesResponse = await getAllPagesVisibleActionPrivate();
    if (pagesResponse.success && pagesResponse.data) {
      pagesResponse.data.forEach((page) => {
        dynamicRoutes.push({
          url: `${BASE_URL}/${page.endpoint}`,
          lastModified: page.updatedAt,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        });
      });
    }

    // Get all tour categories
    const tourCategoriesResponse = await getAllTourCategoriesActionPublic();
    if (tourCategoriesResponse.success && tourCategoriesResponse.data) {
      tourCategoriesResponse.data.forEach((category) => {
        dynamicRoutes.push({
          url: `${BASE_URL}/${category.endpoint}`,
          lastModified: category.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
      });
    }

    // Get all blog categories
    const blogCategoriesResponse = await getAllBlogCategoriesActionPrivate();
    if (blogCategoriesResponse.success && blogCategoriesResponse.data) {
      blogCategoriesResponse.data.forEach((category) => {
        dynamicRoutes.push({
          url: `${BASE_URL}/${category.endpoint}`,
          lastModified: category.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
      });
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
