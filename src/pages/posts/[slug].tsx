import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { getPublishedPosts } from ".";
import { Article, DenormalizedArticle } from "../../generated/graphql-types";
import { Loading } from "../../components/loading";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { PostContent } from "../../components/post-content";
import { createApolloClient } from "../../lib/apollo-client";
import Link from "next/link";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { PublicPostDocument } from "../../lib/page-graphql/query-public-post.graphql.interface";

type PostPageProps = {
  post?: DenormalizedArticle,
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) {
    return <Loading />;
  }

  const pubDate = post.createdTime !== undefined ? new Date(post.createdTime as number).toLocaleDateString() : undefined;

  return (
    <Layout title={post.title || undefined} type="article" description={post.preview || ''}
      image={post.imageSource || undefined} >
      <Paper
        sx={{
          position: 'relative',
          color: '#fff',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${post.imageSource || '/assets/banner.png'})`,
          borderRadius: 0,
        }}
      >
        <img style={{ visibility: 'hidden', maxHeight: "500px" }} src={post.imageSource || '/assets/banner.png'} width="100%" />
      </Paper >
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
  const apolloClient = createApolloClient();
  const data = await apolloClient.query({
    query: PublicPostDocument,
    variables: { slug: params.slug },
    fetchPolicy: 'network-only',
  });
  const post = data.data.publicArticle;
  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
  };
}

export default PostPage;
