import { ApolloError } from "@apollo/client";
import { Container, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { getPostType } from "..";
import { Banner } from "../../../../components/banner";
import { Layout } from "../../../../components/layout";
import { Loading } from "../../../../components/loading";
import { PostContent } from "../../../../components/post-content";
import { ArticleType } from "../../../../generated/graphql-types";
import { EditorPageDocument } from "../../../../lib/page-graphql/query-post.graphql.interface";
import {
  PublicPostQuery,
  PublicPostDocument,
} from "../../../../lib/page-graphql/query-public-post.graphql.interface";
import { NextPageWithApollo, withApollo } from "../../../../lib/with-apollo";
import Error from "next/error";

export type PostPageProps = {
  post?: PublicPostQuery["getPublicArticle"];
  statusCode?: number;
};

const PostPage: NextPageWithApollo<PostPageProps> = ({ post, statusCode }) => {
  if (!post || statusCode === 404) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout
      title={post.title || undefined}
      description={post.preview || ""}
      image={post.imageSource || undefined}
    >
      <Banner>
        <Container>
          <Typography component="h1" variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {post.publishedTime &&
              new Date(post.publishedTime).toLocaleDateString()}
          </Typography>
        </Container>
      </Banner>
      <PostContent post={post} />
    </Layout>
  );
};

PostPage.getInitialProps = async ({ query, apolloClient }) => {
  console.log("!!");
  const type = getPostType(query["post-type"]);
  if (!type) {
    return { statusCode: 404 };
  }
  try {
    const data = await apolloClient?.query({
      query: PublicPostDocument,
      variables: { slug: query.slug as string },
      fetchPolicy: "network-only",
    });
    const post = data?.data.getPublicArticle;
    if (!post || post.type !== type) {
      return { statusCode: 404 };
    }
    return { post };
  } catch (err) {
    console.error(err);
    return { statusCode: 500 };
  }
};

export default withApollo()(PostPage);
