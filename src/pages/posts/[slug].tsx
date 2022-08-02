import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Link, LinkProps } from "../../components/link";
import { Layout } from "../../components/layout";
import { Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Grid, Paper } from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../../components/social-media";
import { Constants } from "../../utils/constants";
import { useI18n } from "../../context/i18n";
import Head from "next/head";
import { Banner } from "../../components/banner";
import { useUser } from "@auth0/nextjs-auth0";
import { useFetchUser } from "../../lib/user";
import { allPosts, PostProps } from ".";

type PostPageProps = {
  post: PostProps,
}

const Post: React.FC<PostProps> = (post) => (
  <Grid item xs={12} md={12} sx={{ my: 3 }}>
    <CardActionArea component="a" href="#">
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          component="img"
          sx={{ height: '100%', width: 180, display: { xs: 'none', sm: 'block' } }}
          image={post.image}
          alt={post.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.publishDate}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.preview}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  </Grid>
)

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const { i18n } = useI18n();
  return (
    <Layout>
      <Banner title="所有文章" >
      </Banner>

      <Container>
        <Post {...post}></Post>
      </Container>
      <style jsx global>{`
        .section:nth-child(odd) {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Layout >
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: allPosts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return { notFound: true };
  }
  const post = allPosts.find(p => p.slug === params.slug);
  if (!post) {
    return { notFound: true };
  }
  return {
    props: {
      post
    },
    revalidate: 300, // In seconds
  }
}

export default PostPage;
