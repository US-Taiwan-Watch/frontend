import { withApollo } from "../../../lib/with-apollo";
import { EditorPageQueryDocument } from "../../../lib/page-graphql/query-post.graphql.interface";
import { PostEditorPage } from "../posts/[post-id]";

PostEditorPage.getInitialProps = async ({ query, apolloClient }) => {
  // TODO: query real post
  try {
    const res = await apolloClient?.query({
      query: EditorPageQueryDocument,
      variables: { articleId: query["post-id"] as string },
      fetchPolicy: "network-only",
    });
    const post = res?.data.article;
    if (!post) {
      return { post: undefined };
    }
    return {
      post,
      editors: res.data.editors,
    };
  } catch (err) {
    return { post: undefined };
  }
};

export default withApollo()(PostEditorPage);
