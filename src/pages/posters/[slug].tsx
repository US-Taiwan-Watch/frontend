import { Container, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Banner } from "../../components/banner";
import { Layout } from "../../components/layout";
import { Loading } from "../../components/loading";
import { PostContent } from "../../components/post-content";
import { ArticleType } from "../../generated/graphql-types";
import {
  PublicPostDocument,
  PublicPostQuery,
} from "../../lib/page-graphql/query-public-post.graphql.interface";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { initApolloClientWithLocale } from "../../lib/with-apollo";
import { getPublishedPostUrlPaths } from "../analysis/[...slugs]";

export type PostPageProps = {
  post?: PublicPostQuery["getPublicArticle"];
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) {
    return <Loading />;
  }
  return (
    <Layout
      title={post.title?.text || undefined}
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
        </Container>
      </Banner>
      <Container>
        <PostContent post={post} />
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async ({
  locales,
}) => {
  const postUrls = await getPublishedPostUrlPaths(ArticleType.Poster, 0, 10);
  return {
    paths: getStaticPathsWithLocale(
      // language!
      postUrls.map((url) => ({
        params: {
          slug: url.split("/")[1],
        },
      })),
      locales
    ),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
  locale,
}) => {
  if (typeof params?.slug !== "string") {
    return { notFound: true };
  }
  const apolloClient = initApolloClientWithLocale(locale);
  try {
    const data = await apolloClient.query({
      query: PublicPostDocument,
      variables: { slug: params.slug },
      fetchPolicy: "network-only",
    });
    const post = data.data.getPublicArticle;
    if (!post || post.type !== ArticleType.Poster) {
      return { notFound: true };
    }
    return {
      props: { post },
    };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};

export default PostPage;
