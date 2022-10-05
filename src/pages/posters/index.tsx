import { GetStaticProps } from "next";
import { ArticleType } from "../../generated/graphql-types";
import PostsPage, { getPublishedPosts, PostsPageProps } from "../articles";

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => ({
  props: {
    posts: await getPublishedPosts(ArticleType.Poster),
  },
  revalidate: 300, // In seconds
});

export default PostsPage;
