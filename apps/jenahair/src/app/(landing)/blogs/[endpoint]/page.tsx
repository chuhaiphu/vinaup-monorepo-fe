import LandingBlogDetailPageContent from '@/components/mains/landing-blog/landing-blog-detail-page-content/landing-blog-detail-page-content';
import LandingBlogDetailSkeleton from '@/components/mains/landing-blog/landing-blog-detail-page-content/landing-blog-detail-skeleton';
import {
  getAllBlogsActionPublic,
  getBlogByEndpointActionPublic,
} from '@/actions/blog-action';
import type { Metadata } from 'next';
import { Suspense } from 'react';

const BLOG_ENDPOINT_PLACEHOLDER = '__placeholder__';

export async function generateStaticParams() {
  const blogsResponse = await getAllBlogsActionPublic();
  const params =
    blogsResponse.success && blogsResponse.data
      ? blogsResponse.data.map((blog) => ({
          endpoint: blog.endpoint,
        }))
      : [];

  return params.length > 0 ? params : [{ endpoint: BLOG_ENDPOINT_PLACEHOLDER }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}): Promise<Metadata> {
  const { endpoint } = await params;
  const blogResponse = await getBlogByEndpointActionPublic(endpoint);

  if (!blogResponse.success || !blogResponse.data) {
    return {
      title: 'Blog Not Found',
    };
  }

  const blog = blogResponse.data;
  const description = blog.content
    ? blog.content.replace(/<[^>]*>/g, '').substring(0, 160)
    : 'Discover expert hair care tips, styling inspiration, and salon insights from Jena Hair';

  return {
    title: `${blog.title} | Jena Hair`,
    description: description,
    openGraph: {
      title: blog.title,
      description: description,
      images: blog.mainImageUrl ? [blog.mainImageUrl] : [],
    },
    alternates: {
      canonical: `https://jenahair.com/blogs/${endpoint}`,
    },
  };
}
  
type BlogDetailPageProps = {
  params: Promise<{ endpoint: string }>;
};

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return (
    <Suspense fallback={<LandingBlogDetailSkeleton />}>
      <LandingBlogDetailPageContent params={params} />
    </Suspense>
  );
}
