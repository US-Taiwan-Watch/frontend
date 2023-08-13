import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { getPaginatedPublishedPosts } from ".";
import { Loading } from "../../components/loading";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { PostContent } from "../../components/post-content";
import { useTheme } from "@mui/material";
import {
  PublicPostDocument,
  PublicPostQuery,
} from "../../lib/page-graphql/query-public-post.graphql.interface";
import { ArticleType } from "../../generated/graphql-types";
import { getPostPublishDate, getPostUrl } from "../admin/[post-type]";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { initApolloClientWithLocale } from "../../lib/with-apollo";
import { MediaContainer } from "../../components/media-container";

export type PostPageProps = {
  post?: PublicPostQuery["getPublicArticle"];
  nextPost: Partial<PublicPostQuery["getPublicArticle"]>;
};

const PostPage: NextPage<PostPageProps> = ({ post, nextPost }) => {
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
  const theme = useTheme();

  if (!post) {
    return <Loading />;
  }
  return (
    <Layout
      title={post.title?.text}
      type="article"
      description={post.preview?.text || ""}
      image={post.imageSource}
    >
      <MediaContainer
        title={post.title?.text}
        imageSrc={post.imageSource}
        next={
          (nextPost && {
            title: nextPost.title?.text || "",
            url: getPostUrl(nextPost),
          }) ||
          undefined
        }
      >
        <PostContent post={post} />
      </MediaContainer>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{ slugs: string[] }> = async ({
  locales,
}) => {
  const apolloClient = initApolloClientWithLocale();
  const posts = (
    await getPaginatedPublishedPosts(ArticleType.Article, 1, 20, apolloClient)
  ).items;
  return {
    paths: getStaticPathsWithLocale(
      // language!
      posts.map((post) => {
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
    const nextPosts = data.data.getPublicArticlesAfter.items;
    return {
      props: { post, nextPost: nextPosts.length > 0 ? nextPosts[0] : null },
      revalidate: 300,
    };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};

export default PostPage;
