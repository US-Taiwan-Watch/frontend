import { Container } from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import { Banner } from "../../components/banner";
import { CardList, FeaturedCards } from "../../components/card-list";
import { Layout } from "../../components/layout";
import { useI18n } from "../../context/i18n";
import { ArticleType } from "../../generated/graphql-types";
import { PublicPostsQuery } from "../../lib/page-graphql/query-public-posts.graphql.interface";
import { getPostUrl } from "../admin/[post-type]";
import { getPaginatedPublishedPosts } from "../analysis";
import { initApolloClientWithLocale } from "../../lib/with-apollo";

export type PostsPageProps = {
  paginatedPosts: PublicPostsQuery["getPostsWithType"];
};

const PostsPage: NextPage<PostsPageProps> = ({ paginatedPosts }) => {
  const { i18n } = useI18n();
  const cards = paginatedPosts.items
    .map((p) => ({
      title: p.title?.text || "",
      displayDate: new Date(p.publishedTime || 0).toLocaleDateString(), // change to pub date
      content: p.preview?.text || "",
      url: getPostUrl(p),
      image: p.imageSource || undefined,
    }))
    .reverse();
  return (
    <Layout
      title={i18n.strings.posters.title}
      description={i18n.strings.posters.desc}
    >
      <Banner
        title={i18n.strings.posters.title}
        subtitle={i18n.strings.posters.desc}
      ></Banner>
      {/* {isEditor && <>
        <Link href={`/admin/posts`}>
          <Button variant="contained">Manage Posts</Button>
        </Link>
      </>} */}
      {cards.length >= 3 ? (
        <Container>
          <FeaturedCards cards={cards} />
        </Container>
      ) : (
        <CardList cards={cards} />
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async ({ locale }) => {
  const apolloClient = initApolloClientWithLocale(locale);
  return {
    props: {
      paginatedPosts: await getPaginatedPublishedPosts(
        ArticleType.Poster,
        1,
        20,
        apolloClient
      ),
    },
    revalidate: 300, // In seconds
  };
};

export default PostsPage;
