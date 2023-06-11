import { Container, Typography } from "@mui/material";
import { getPostType } from "..";
import { Banner } from "../../../../components/banner";
import { Layout } from "../../../../components/layout";
import { PostContent } from "../../../../components/post-content";
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
      <PostContent post={post} />
    </Layout>
  );
};

PostPage.getInitialProps = async ({ query, apolloClient }) => {
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
