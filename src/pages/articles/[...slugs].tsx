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
  post?: PublicPostQuery["publicArticle"];
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const router = useRouter();
  useEffect(() => {
    if (!post?.pusblishTime) {
      return;
    }
    const slugs = router.query["slugs"];
    const date = getPostPublishDate(post.pusblishTime);
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
    (await getPublishedPosts(ArticleType.Article)).map((post) => {
      if (!post.pusblishTime) {
        return {
          params: {
            slugs: [post.slug as string],
          },
        };
      }
      const date = getPostPublishDate(post.pusblishTime);
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
}) => {
  const slugs = params?.slugs;
  if (!slugs) {
    return { notFound: true };
  }
  const apolloClient = createApolloClient();
  const data = await apolloClient.query({
    query: PublicPostDocument,
    variables: { slug: slugs[slugs.length - 1] },
    fetchPolicy: "network-only",
  });
  const post = data.data.publicArticle;
  if (!post || post.type !== ArticleType.Article || !post.pusblishTime) {
    return { notFound: true };
  }
  return { props: { post } };
};

export default PostPage;
