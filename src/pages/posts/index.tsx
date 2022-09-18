import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { useRouter } from "next/router";
import { CardList } from "../../components/card-list";
import { Link } from "../../components/link";
import { Button } from "@mui/material";
import { AllArticlesDocument } from "../../lib/page-graphql/query-posts.graphql.interface";
import { Article } from "../../generated/graphql-types";
import { initApolloClient } from "../../lib/with-apollo";
import { useFetchUser } from "../../lib/user";

type PostsPageProps = {
  posts: Article[],
}

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  const router = useRouter();
  const { isEditor } = useFetchUser();
  return (
    <Layout title="所有文章">
      <Banner title="所有文章" >
      </Banner>
      {/* {isEditor && <>
        <Link href={`/admin/posts`}>
          <Button variant="contained">Manage Posts</Button>
        </Link>
      </>} */}

      <CardList cards={posts.map(p => ({
        title: p.title || '',
        displayDate: new Date(p.pusblishTime || 0).toLocaleDateString(), // change to pub date
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
  }).then(data => data.data.allArticles.filter(p => p.isPublished).map(p => ({
    ...p,
    slug: p.slug || p.id,
  })).sort((a, b) => a.pusblishTime! - b.pusblishTime!));
};

export default PostsPage;
