import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Link } from "../../components/link";
import { Layout } from "../../components/layout";
import { Box, Button, Container } from "@mui/material";
import { Banner } from "../../components/banner";
import { getPublishedPosts } from ".";
import { AdaptiveEditor } from "../../components/component-adaptive-editor";
import { useUserRole } from "../../context/user-role";
import { Article } from "../../generated/graphql-types";
import { PublishedPostDocument } from "../../lib/page-graphql/query-post-by-slug.graphql.interface";
import { Loading } from "../../components/loading";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { initApolloClient } from "../../lib/with-apollo";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

type PostPageProps = {
  post?: Article,
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const { isEditor } = useUserRole();

  if (!post) {
    return <Loading />;
  }

  const pubDate = post.createdTime !== undefined ? new Date(post.createdTime as number).toLocaleDateString() : undefined;

  return (
    <Layout>
      <Banner title={post.title || ''} subtitle={pubDate} />
      <Container>
        {isEditor && <>
          <Link href={`admin/${post.id}`}>
            <Button variant="contained">EDIT</Button>
          </Link>
          <Typography sx={{ mx: 5 }}>{post.isPublished ? 'Published' : 'Draft'}</Typography>
        </>
        }
        <Box alignItems="center" sx={{ paddingTop: 3, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {pubDate}
          </Typography>
        </Box>
        <AdaptiveEditor value={post.content || ''} viewOnly={true} />
      </Container>
    </Layout >
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async ({ locales }) => (
  {
    paths: getStaticPathsWithLocale((await getPublishedPosts()).map(post => ({
      params: { slug: post.slug as string }
    })), locales),
    fallback: true,
  }
);

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  if (typeof params?.slug !== 'string') {
    return { notFound: true };
  }
  let post: Article | null | undefined;
  // In build time, query all posts (it will be cached) to avoid querying every post one by one
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    const posts = await getPublishedPosts();
    post = posts.find(p => p.slug === params.slug);
  }
  else {
    const apolloClient = initApolloClient();
    const data = await apolloClient.query({
      query: PublishedPostDocument,
      variables: { slug: params.slug },
      fetchPolicy: 'network-only',
    });
    post = data.data.articleBySlug;
  }
  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
    revalidate: 300, // In seconds
  };
}

export default PostPage;
