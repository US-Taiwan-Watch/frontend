import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { CardList } from "../../components/card-list";
import { Article, ArticleType } from "../../generated/graphql-types";
import { initApolloClient } from "../../lib/with-apollo";
import { getPostUrl } from "../admin/[post-type]";
import { useI18n } from "../../context/i18n";
import { PublicPostsDocument } from "../../lib/page-graphql/query-public-posts.graphql.interface";

type PostsPageProps = {
  posts: Article[];
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
            title: p.title || "",
            displayDate: new Date(p.pusblishTime || 0).toLocaleDateString(), // change to pub date
            content: p.preview || "",
            url: getPostUrl(p),
            image: p.imageSource || undefined,
          }))
          .reverse()}
      />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => ({
  props: {
    posts: await getPublishedPosts(ArticleType.Article),
  },
  revalidate: 300, // In seconds
});

// It has to not be a async function for nextjs to cache it in build time. Not sure why though.
export const getPublishedPosts = (type: ArticleType): Promise<Article[]> => {
  const apolloClient = initApolloClient();
  return apolloClient
    .query({
      query: PublicPostsDocument,
      fetchPolicy: "network-only",
    })
    .then((data) =>
      data.data.allArticles
        .filter((p) => p.isPublished)
        .filter((p) => p.type === type)
        .map((p) => ({
          ...p,
          slug: p.slug || p.id,
        }))
        .sort((a, b) => a.pusblishTime! - b.pusblishTime!)
    );
};

export default PostsPage;
