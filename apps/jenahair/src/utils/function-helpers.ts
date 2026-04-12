import slugify from 'slugify';
import { getTourByEndpointActionPublic } from '@/actions/tour-action';
import { getTourCategoryByEndpointActionPublic } from '@/actions/tour-category-action';
import { getPageByEndpointActionPublic } from '@/actions/page-action';
import { getBlogCategoryByEndpointActionPublic } from '@/actions/blog-category-action';
import { getBlogByEndpointActionPublic } from '@/actions/blog-action';

export * from '@vinaup/utils';

export const validateImageFile = (file: File) => {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  return validTypes.includes(file.type);
};

/**
 * Sanitize endpoint string to only allow URL-safe characters
 */
export const sanitizeEndpoint = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const generateUniqueEndpoint = async (
  title: string,
  model: 'tour' | 'blog' | 'landing',
  currentModelId?: string
): Promise<string> => {
  let slugifiedTitle = '';
  if (!title || title.trim().length === 0) {
    slugifiedTitle = 'no-title';
  } else {
    slugifiedTitle = title;
  }
  const baseEndpoint = slugify(slugifiedTitle, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: false,
    locale: 'vi',
    trim: true,
  });

  let endpoint = baseEndpoint;
  let isUnique = false;

  while (!isUnique) {
    if (model === 'tour') {
      const existingTour = await getTourByEndpointActionPublic(endpoint);
      const tourConflict =
        existingTour.success &&
        existingTour.data &&
        existingTour.data.id !== currentModelId;

      if (tourConflict) {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        endpoint = `${baseEndpoint}-${randomSuffix}`;
      } else {
        isUnique = true;
      }
    } else if (model === 'blog') {
      const existingBlog = await getBlogByEndpointActionPublic(endpoint);
      const blogConflict =
        existingBlog.success &&
        existingBlog.data &&
        existingBlog.data.id !== currentModelId;

      if (blogConflict) {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        endpoint = `${baseEndpoint}-${randomSuffix}`;
      } else {
        isUnique = true;
      }
    } else {
      const [existingTourCategory, existingPage, existingBlogCategory] =
        await Promise.all([
          getTourCategoryByEndpointActionPublic(endpoint),
          getPageByEndpointActionPublic(endpoint),
          getBlogCategoryByEndpointActionPublic(endpoint),
        ]);

      const categoryConflict =
        existingTourCategory.success &&
        existingTourCategory.data &&
        existingTourCategory.data.id !== currentModelId;

      const pageConflict =
        existingPage.success &&
        existingPage.data &&
        existingPage.data.id !== currentModelId;

      const blogCategoryConflict =
        existingBlogCategory.success &&
        existingBlogCategory.data &&
        existingBlogCategory.data.id !== currentModelId;

      if (categoryConflict || pageConflict || blogCategoryConflict) {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        endpoint = `${baseEndpoint}-${randomSuffix}`;
      } else {
        isUnique = true;
      }
    }
  }

  return endpoint;
};
