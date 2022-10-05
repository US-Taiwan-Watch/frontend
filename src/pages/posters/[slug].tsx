import { GetStaticPaths, GetStaticProps } from "next";
import { ArticleType } from "../../generated/graphql-types";
import { createApolloClient } from "../../lib/apollo-client";
import { PublicPostDocument } from "../../lib/page-graphql/query-public-post.graphql.interface";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { getPublishedPosts } from "../articles";
import PostPage, { PostPageProps } from "../articles/[...slugs]";

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
