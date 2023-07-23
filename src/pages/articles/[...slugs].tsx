import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { getPublishedPosts } from ".";
import { Loading } from "../../components/loading";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { PostContent } from "../../components/post-content";
import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import {
  PublicPostDocument,
  PublicPostQuery,
} from "../../lib/page-graphql/query-public-post.graphql.interface";
import { ArticleType } from "../../generated/graphql-types";
import { getPostPublishDate, getPostUrl } from "../admin/[post-type]";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { initApolloClientWithLocale } from "../../lib/with-apollo";
import { Link } from "../../components/link";
import { SmallCardItem } from "../../components/card-list";

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
      <Container>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                Articles
              </Link>
            </Breadcrumbs>
            <Typography component="h1" variant="h4" gutterBottom>
              {post.title?.text}
            </Typography>
            <hr />
            <PostContent post={post} />
          </Grid>
          <Grid item md={4}>
            <SmallCardItem
              url="test"
              title="test"
              content="test!"
              displayDate="2022/2/2"
              image={post.imageSource || undefined}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{ slugs: string[] }> = async ({
  locales,
}) => {
  const posts = await getPublishedPosts(ArticleType.Article);
  return {
    paths: getStaticPathsWithLocale(
      // language!
      posts.slice(0, 100).map((post) => {
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
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
  locale,
}) => {
  const slugs = params?.slugs;
  if (!slugs) {
    return { notFound: true };
  }
  const apolloClient = initApolloClientWithLocale(locale);
  try {
    const data = await apolloClient.query({
      query: PublicPostDocument,
      variables: { slug: slugs[slugs.length - 1] },
      fetchPolicy: "network-only",
    });
    const post = data.data.getPublicArticle;
    if (!post || post.type !== ArticleType.Article || !post.publishedTime) {
      return { notFound: true };
    }
    return { props: { post }, revalidate: 300 };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};

export default PostPage;
