import LandingDiaryDetailPageContent from '@/components/mains/landing-diary/landing-diary-detail-page-content/landing-diary-detail-page-content';
import LandingDiaryDetailPageContentSkeleton from '@/components/mains/landing-diary/landing-diary-detail-page-content/landing-diary-detail-page-content-skeleton';
import LandingDiaryCategoryPageContent from '@/components/mains/landing-diary/landing-diary-category-page/landing-diary-category-page-content';
import LandingDiaryCategoryPageContentSkeleton from '@/components/mains/landing-diary/landing-diary-category-page/landing-diary-category-page-content-skeleton';
import {
  getAllDiariesActionPublic,
  getDiaryByEndpointActionPublic,
} from '@/actions/diary-action';
import {
  getAllDiaryCategoriesActionPublic,
  getDiaryCategoryByEndpointActionPublic,
} from '@/actions/diary-category-action';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const DIARY_ENDPOINT_PLACEHOLDER = '__placeholder__';

export async function generateStaticParams() {
  const [diariesResponse, categoriesResponse] = await Promise.all([
    getAllDiariesActionPublic(),
    getAllDiaryCategoriesActionPublic(),
  ]);

  const diaryParams =
    diariesResponse.success && diariesResponse.data
      ? diariesResponse.data.map((diary) => ({ endpoint: diary.endpoint }))
      : [];

  const categoryParams =
    categoriesResponse.success && categoriesResponse.data
      ? categoriesResponse.data
          .filter((category) => category.endpoint !== '__root__')
          .map((category) => ({ endpoint: category.endpoint }))
      : [];

  const params = [...diaryParams, ...categoryParams];

  return params.length > 0 ? params : [{ endpoint: DIARY_ENDPOINT_PLACEHOLDER }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}): Promise<Metadata> {
  const { endpoint } = await params;

  const diaryResponse = await getDiaryByEndpointActionPublic(endpoint);
  if (diaryResponse.success && diaryResponse.data) {
    const diary = diaryResponse.data;
    const description = diary.content
      ? diary.content.replace(/<[^>]*>/g, '').substring(0, 160)
      : 'Discover expert hair care tips, styling inspiration, and salon insights from Jena Hair';

    return {
      title: `${diary.title} | Jena Hair`,
      description,
      openGraph: {
        title: diary.title,
        description,
        images: diary.mainImageUrl ? [diary.mainImageUrl] : [],
      },
      alternates: {
        canonical: `https://jenahair.com/nhat-ky/${endpoint}`,
      },
    };
  }

  const categoryResponse = await getDiaryCategoryByEndpointActionPublic(endpoint);
  if (categoryResponse.success && categoryResponse.data) {
    const category = categoryResponse.data;
    const description = category.description
      ? category.description.replace(/<[^>]*>/g, '').substring(0, 160)
      : 'Discover expert hair care tips, styling inspiration, and salon insights from Jena Hair';

    return {
      title: `${category.title} | Jena Hair`,
      description,
      openGraph: {
        title: category.title,
        description,
        images: category.mainImageUrl ? [category.mainImageUrl] : [],
      },
      alternates: {
        canonical: `https://jenahair.com/nhat-ky/${endpoint}`,
      },
    };
  }

  return {
    title: 'Diary Not Found',
  };
}

type DiaryEndpointPageProps = {
  params: Promise<{ endpoint: string }>;
  searchParams: Promise<{ q?: string; destinations?: string }>;
};

export default async function DiaryEndpointPage({
  params,
  searchParams,
}: DiaryEndpointPageProps) {
  const { endpoint } = await params;

  if (endpoint === DIARY_ENDPOINT_PLACEHOLDER) {
    notFound();
  }

  const diaryResponse = await getDiaryByEndpointActionPublic(endpoint);
  if (diaryResponse.success && diaryResponse.data) {
    return (
      <Suspense fallback={<LandingDiaryDetailPageContentSkeleton />}>
        <LandingDiaryDetailPageContent params={params} />
      </Suspense>
    );
  }

  const categoryResponse = await getDiaryCategoryByEndpointActionPublic(endpoint);
  if (categoryResponse.success && categoryResponse.data) {
    return (
      <Suspense fallback={<LandingDiaryCategoryPageContentSkeleton />}>
        <LandingDiaryCategoryPageContent
          category={categoryResponse.data}
          searchParams={searchParams}
        />
      </Suspense>
    );
  }

  notFound();
}
