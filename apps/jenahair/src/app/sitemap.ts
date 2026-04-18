import { MetadataRoute } from 'next';
import { getAllBlogsActionPublic } from '@/actions/blog-action';
import { getAllPagesVisibleActionPrivate } from '@/actions/page-action';
import { getAllBlogCategoriesActionPrivate } from '@/actions/blog-category-action';
import { getAllDiariesActionPublic } from '@/actions/diary-action';
import { getAllDiaryCategoriesActionPublic } from '@/actions/diary-category-action';

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
      url: `${BASE_URL}/blogs`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/nhat-ky`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Dynamic routes from database
  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
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

    // Get all public diaries
    const diariesResponse = await getAllDiariesActionPublic();
    if (diariesResponse.success && diariesResponse.data) {
      diariesResponse.data.forEach((diary) => {
        dynamicRoutes.push({
          url: `${BASE_URL}/nhat-ky/${diary.endpoint}`,
          lastModified: diary.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        });
      });
    }

    // Get all diary categories
    const diaryCategoriesResponse = await getAllDiaryCategoriesActionPublic();
    if (diaryCategoriesResponse.success && diaryCategoriesResponse.data) {
      diaryCategoriesResponse.data.forEach((category) => {
        dynamicRoutes.push({
          url: `${BASE_URL}/nhat-ky/${category.endpoint}`,
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
