import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { CardList } from "../../components/card-list";
import { ArticleType } from "../../generated/graphql-types";
import {
  initApolloClient,
  initApolloClientWithLocale,
} from "../../lib/with-apollo";
import { getPostUrl } from "../admin/[post-type]";
import { useI18n } from "../../context/i18n";
import {
  PublicPostsDocument,
  PublicPostsQuery,
} from "../../lib/page-graphql/query-public-posts.graphql.interface";

type PostsPageProps = {
  posts: PublicPostsQuery["getAllArticles"];
};

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  const { i18n } = useI18n();
  return (
    <Layout
      title={i18n.strings.articles.title}
      description={i18n.strings.articles.desc}
    >
      <Banner
        title={i18n.strings.articles.title}
        subtitle={i18n.strings.articles.desc}
      ></Banner>
      {/* {isEditor && <>
        <Link href={`/admin/posts`}>
          <Button variant="contained">Manage Posts</Button>
        </Link>
      </>} */}

      <CardList
        cards={posts
          .map((p) => ({
            title: p.title?.text || "",
            displayDate: new Date(p.publishedTime || 0).toLocaleDateString(), // change to pub date
            content: p.preview?.text || "",
            url: getPostUrl(p),
            image: p.imageSource || undefined,
          }))
          .reverse()}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async ({
  locale,
}) => ({
  props: {
    posts: await getPublishedPosts(ArticleType.Article, locale),
  },
  revalidate: 300, // In seconds
});

export const getPublishedPosts = async (
  type: ArticleType,
  lang?: string
): Promise<PublicPostsQuery["getAllArticles"]> => {
  const apolloClient = initApolloClientWithLocale(lang);

  const res = await apolloClient.query({
    query: PublicPostsDocument,
    fetchPolicy: "network-only",
  });
  return res.data.getAllArticles
    .filter((p) => p.isPublished)
    .filter((p) => p.type === type)
    .map((p) => ({
      ...p,
      slug: p.slug || p.id,
    }))
    .sort((a, b) => a.publishedTime! - b.publishedTime!);
};

export default PostsPage;
