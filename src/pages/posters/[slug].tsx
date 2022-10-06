import { Avatar, Box, Chip, Container, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Banner } from "../../components/banner";
import { Layout } from "../../components/layout";
import { Loading } from "../../components/loading";
import { PostContent } from "../../components/post-content";
import { ArticleType } from "../../generated/graphql-types";
import { createApolloClient } from "../../lib/apollo-client";
import {
  PublicPostDocument,
  PublicPostQuery,
} from "../../lib/page-graphql/query-public-post.graphql.interface";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { getPublishedPosts } from "../articles";

export type PostPageProps = {
  post?: PublicPostQuery["publicArticle"];
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) {
    return <Loading />;
  }
  return (
    <Layout
      title={post.title || undefined}
      type="article"
      description={post.preview || ""}
      image={post.imageSource || undefined}
    >
      <Banner>
        <Container>
          <Typography component="h1" variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {post.pusblishTime &&
              new Date(post.pusblishTime).toLocaleDateString()}
          </Typography>
        </Container>
      </Banner>
      <PostContent post={post} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async ({
  locales,
}) => ({
  paths: getStaticPathsWithLocale(
    (await getPublishedPosts(ArticleType.Poster)).map((post) => ({
      params: { slug: post.slug as string },
    })),
    locales
  ),
  fallback: true,
});

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  if (typeof params?.slug !== "string") {
    return { notFound: true };
  }
  const apolloClient = createApolloClient();
  const data = await apolloClient.query({
    query: PublicPostDocument,
    variables: { slug: params.slug },
    fetchPolicy: "network-only",
  });
  const post = data.data.publicArticle;
  if (!post || post.type !== ArticleType.Poster) {
    return { notFound: true };
  }
  return {
    props: { post },
  };
};

export default PostPage;
