import slugify from 'slugify';
import { getTourByEndpointActionPublic } from '@/actions/tour-action';
import { getTourCategoryByEndpointActionPublic } from '@/actions/tour-category-action';
import { getPageByEndpointActionPublic } from '@/actions/page-action';
import { getBlogCategoryByEndpointActionPublic } from '@/actions/blog-category-action';
import { getBlogByEndpointActionPublic } from '@/actions/blog-action';
import { getDiaryByEndpointActionPublic } from '@/actions/diary-action';
import { getDiaryCategoryByEndpointActionPublic } from '@/actions/diary-category-action';
import { ActionResponse } from '@/interfaces/_base-interface';

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

export type EndpointModel =
  | 'tour'
  | 'tour-category'
  | 'blog'
  | 'blog-category'
  | 'diary'
  | 'diary-category'
  | 'page';

type EndpointChecker = (
  endpoint: string
) => Promise<ActionResponse<{ id: string } | null>>;

const checkersByModel: Record<EndpointModel, EndpointChecker[]> = {
  tour: [getTourByEndpointActionPublic, getTourCategoryByEndpointActionPublic],
  'tour-category': [
    getTourByEndpointActionPublic,
    getTourCategoryByEndpointActionPublic,
  ],
  blog: [getBlogByEndpointActionPublic, getBlogCategoryByEndpointActionPublic],
  'blog-category': [
    getBlogByEndpointActionPublic,
    getBlogCategoryByEndpointActionPublic,
  ],
  diary: [
    getDiaryByEndpointActionPublic,
    getDiaryCategoryByEndpointActionPublic,
  ],
  'diary-category': [
    getDiaryByEndpointActionPublic,
    getDiaryCategoryByEndpointActionPublic,
  ],
  page: [getPageByEndpointActionPublic],
};

export const generateUniqueEndpoint = async (
  title: string,
  model: EndpointModel,
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

  const checkers = checkersByModel[model];
  let endpoint = baseEndpoint;
  let isUnique = false;

  while (!isUnique) {
    const results = await Promise.all(checkers.map((fn) => fn(endpoint)));
    const hasConflict = results.some(
      (res) => res.success && res.data && res.data.id !== currentModelId
    );

    if (hasConflict) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      endpoint = `${baseEndpoint}-${randomSuffix}`;
    } else {
      isUnique = true;
    }
  }

  return endpoint;
};
