import { Container } from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import { Banner } from "../../components/banner";
import { CardList, FeaturedCards } from "../../components/card-list";
import { Layout } from "../../components/layout";
import { useI18n } from "../../context/i18n";
import { Article, ArticleType } from "../../generated/graphql-types";
import { getPostUrl } from "../admin/[post-type]";
import { getPublishedPosts } from "../articles";

export type PostsPageProps = {
  posts: Article[];
};

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  const { i18n } = useI18n();
  const cards = posts
    .map((p) => ({
      title: p.title || "",
      displayDate: new Date(p.pusblishTime || 0).toLocaleDateString(), // change to pub date
      content: p.preview || "",
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

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => ({
  props: {
    posts: await getPublishedPosts(ArticleType.Poster),
  },
  revalidate: 300, // In seconds
});

export default PostsPage;
