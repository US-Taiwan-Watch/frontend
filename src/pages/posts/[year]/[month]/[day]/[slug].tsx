import type { GetStaticPaths, GetStaticProps } from "next";
import { getPublishedPosts } from "../../..";
import { getStaticPathsWithLocale } from "../../../../../utils/page-utils";
import { ArticleType } from "../../../../../generated/graphql-types";
import PostPage, {
  getStaticProps as getStaticPropsDraft,
  PostPageProps,
} from "../../../draft/[slug]";
import { getPostPublishDate } from "../../../../admin/[type]";

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async ({
  locales,
}) => ({
  paths: getStaticPathsWithLocale(
    (await getPublishedPosts(ArticleType.Post)).map((post) => ({
      params: {
        slug: post.slug as string,
        ...getPostPublishDate(post.pusblishTime || undefined),
      },
    })),
    locales
  ),
  fallback: true,
});

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context
) => {
  const result = await getStaticPropsDraft(context);
  if ("props" in result) {
    const date = getPostPublishDate(
      result.props.post?.pusblishTime || undefined
    );
    if (
      context.params?.year !== date?.year ||
      context.params?.month !== date?.month ||
      context.params?.day !== date?.day
    ) {
      return { notFound: true };
    }
  }
  return result;
};

export default PostPage;
