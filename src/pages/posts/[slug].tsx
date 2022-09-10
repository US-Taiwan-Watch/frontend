import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { getPublishedPosts } from ".";
import { Article } from "../../generated/graphql-types";
import { PublishedPostDocument } from "../../lib/page-graphql/query-post-by-slug.graphql.interface";
import { Loading } from "../../components/loading";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { initApolloClient } from "../../lib/with-apollo";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { PostContent } from "../../components/post-content";

type PostPageProps = {
  post?: Article,
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) {
    return <Loading />;
  }

  const pubDate = post.createdTime !== undefined ? new Date(post.createdTime as number).toLocaleDateString() : undefined;

  return (
    <Layout title={post.title || undefined} type="article" description={post.preview || ''}
      image={post.imageSource || undefined} >
      <Banner title={post.title || ''} subtitle={pubDate} />
      <PostContent post={post} />
    </Layout >
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async ({ locales }) => (
  {
    paths: getStaticPathsWithLocale((await getPublishedPosts()).map(post => ({
      params: { slug: post.slug as string }
    })), locales),
    fallback: true,
  }
);

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  if (typeof params?.slug !== 'string') {
    return { notFound: true };
  }
  let post: Article | null | undefined;
  // In build time, query all posts (it will be cached) to avoid querying every post one by one
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    const posts = await getPublishedPosts();
    post = posts.find(p => p.slug === params.slug);
  }
  else {
    const apolloClient = initApolloClient();
    const data = await apolloClient.query({
      query: PublishedPostDocument,
      variables: { slug: params.slug },
      fetchPolicy: 'network-only',
    });
    post = data.data.articleBySlug;
  }
  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
    revalidate: 300, // In seconds
  };
}

export default PostPage;
