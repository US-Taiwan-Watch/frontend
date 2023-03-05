import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { getPublishedPosts } from ".";
import { Loading } from "../../components/loading";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { PostContent } from "../../components/post-content";
import { createApolloClient } from "../../lib/apollo-client";
import { Avatar, Box, Chip, Container, Typography } from "@mui/material";
import {
  PublicPostDocument,
  PublicPostQuery,
} from "../../lib/page-graphql/query-public-post.graphql.interface";
import { ArticleType } from "../../generated/graphql-types";
import { getPostPublishDate, getPostUrl } from "../admin/[post-type]";
import { useEffect } from "react";
import { useRouter } from "next/router";

export type PostPageProps = {
  post?: PublicPostQuery["getPublicArticle"];
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const router = useRouter();
  useEffect(() => {
    if (!post?.publishedTime) {
      return;
    }
    const slugs = router.query["slugs"];
    const date = getPostPublishDate(post.publishedTime);
    if (
      slugs?.length === 3 &&
      slugs[0] === date.year &&
      slugs[1] === date.month
    ) {
      return;
    }
    router.replace(getPostUrl(post), undefined, { shallow: true });
  }, [post, router]);

  if (!post) {
    return <Loading />;
  }
  return (
    <Layout
      title={post.title?.text || undefined}
      type="article"
      description={post.preview?.text || ""}
      image={post.imageSource || undefined}
    >
      <Banner>
        <Container>
          <Typography component="h1" variant="h4" gutterBottom>
            {post.title?.text}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {post.publishedTime &&
              new Date(post.publishedTime).toLocaleDateString()}
          </Typography>
          <Typography variant="subtitle1">
            {post.authorInfos?.map((author) => (
              <Box
                key={author.nickname}
                sx={{ display: "inline-block" }}
                marginRight={1}
                marginTop={1}
              >
                <Chip
                  color="primary"
                  avatar={
                    <Avatar
                      alt={author.name || ""}
                      src={author.picture || ""}
                    />
                  }
                  label={author.name}
                />
              </Box>
            ))}
          </Typography>
        </Container>
      </Banner>
      <PostContent post={post} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{ slugs: string[] }> = async ({
  locales,
}) => ({
  paths: getStaticPathsWithLocale(
    // language!
    (await getPublishedPosts(ArticleType.Article)).map((post) => {
      if (!post.publishedTime) {
        return {
          params: {
            slugs: [post.slug as string],
          },
        };
      }
      const date = getPostPublishDate(post.publishedTime);
      return {
        params: {
          slugs: [date?.year, date?.month, post.slug as string],
        },
      };
    }),
    locales
  ),
  fallback: true,
});

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
  locale,
}) => {
  const slugs = params?.slugs;
  if (!slugs) {
    return { notFound: true };
  }
  const apolloClient = createApolloClient();
  try {
    const data = await apolloClient.query({
      query: PublicPostDocument,
      variables: { slug: slugs[slugs.length - 1], lang: locale },
      fetchPolicy: "network-only",
    });
    const post = data.data.getPublicArticle;
    if (!post || post.type !== ArticleType.Article || !post.publishedTime) {
      return { notFound: true };
    }
    return { props: { post } };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};

export default PostPage;