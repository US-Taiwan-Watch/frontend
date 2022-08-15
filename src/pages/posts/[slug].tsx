import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Link, LinkProps } from "../../components/link";
import { Layout } from "../../components/layout";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Grid, Paper } from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../../components/social-media";
import { Constants } from "../../utils/constants";
import { useI18n } from "../../context/i18n";
import Head from "next/head";
import { Banner } from "../../components/banner";
import { useUser } from "@auth0/nextjs-auth0";
import { useFetchUser } from "../../lib/user";
import { allPosts, PostProps } from ".";
import { AdaptiveEditor } from "../../components/component-adaptive-editor";
import { useUserRole } from "../../context/user-role";
import { useEffect, useState } from "react";

type PostPageProps = {
  post: PostProps,
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => (
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
  const { isEditor } = useUserRole();
  const [editorValue, setEditorValue] = useState(post.content);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`saved/${post.id}`);
      if (saved) {
        setEditorValue(saved);
      }
    }
  }, []);

  return (
    <Layout>
      <Banner title={post.title} subtitle={post.publishDate} />
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
            {post.publishDate}
          </Typography>
        </Box>
        <AdaptiveEditor value={editorValue} viewOnly={true} />
      </Container>
    </Layout >
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => (
  {
    paths: allPosts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: 'blocking', // can also be true or 'blocking'
  }
);

export const getStaticProps: GetStaticProps<PostPageProps> = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return { notFound: true };
  }
  const post = allPosts.find(p => p.slug === params.slug);
  if (!post) {
    return { notFound: true };
  }
  return {
    props: { post },
    revalidate: 300, // In seconds
  }
}

export default PostPage;
