import { ArticleType } from "../../../generated/graphql-types";
import { AllArticlesDocument } from "../../../lib/page-graphql/query-posts.graphql.interface";
import { withApollo } from "../../../lib/with-apollo";
import { PostsAdminPage } from "../posts";

PostsAdminPage.getInitialProps = async ({ apolloClient }) => {
  try {
    const data = await apolloClient?.query({
      query: AllArticlesDocument,
      fetchPolicy: "network-only",
    });
    return {
      posts: data?.data.allArticles
        .map((post) => ({
          ...post,
          pusblishTime: post.isPublished ? post.pusblishTime : null,
        }))
        .filter((p) => p.type === ArticleType.Poster),
    };
  } catch (err) {
    console.log(err);
    return { posts: undefined };
  }
};

export default withApollo()(PostsAdminPage);
