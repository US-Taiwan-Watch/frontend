import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { useRouter } from "next/router";
import { CardList } from "../../components/card-list";
import { useUserRole } from "../../context/user-role";
import { Link } from "../../components/link";
import { Button } from "@mui/material";
import { AllArticlesDocument } from "../../lib/page-graphql/query-posts.graphql.interface";
import { Article } from "../../generated/graphql-types";
import { initApolloClient } from "../../lib/with-apollo";

type PostsPageProps = {
  posts: Article[],
}

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  const router = useRouter();
  const { isEditor } = useUserRole();
  return (
    <Layout>
      <Banner title="所有文章" >
      </Banner>
      {isEditor && <>
        <Link href={`posts/admin`}>
          <Button variant="contained">Manage Posts</Button>
        </Link>
      </>}

      <CardList cards={posts.map(p => ({
        title: p.title || '',
        displayDate: new Date(p.createdTime || 0).toLocaleDateString(), // change to pub date
        content: p.preview || '',
        url: `${router.pathname}/${p.slug}`,
        image: p.imageSource || undefined,
      })).reverse()} />

    </Layout >
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => ({
  props: {
    posts: await getPublishedPosts(),
  },
  revalidate: 300, // In seconds
});

// It has to not be a async function for nextjs to cache it in build time. Not sure why though.
export const getPublishedPosts = (): Promise<Article[]> => {
  const apolloClient = initApolloClient();
  return apolloClient.query({
    query: AllArticlesDocument,
    fetchPolicy: "network-only",
  }).then(data => data.data.allArticles.map(p => ({
    ...p,
    slug: p.slug || p.id,
  })));
};

export default PostsPage;
