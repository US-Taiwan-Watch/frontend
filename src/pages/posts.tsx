import type { GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Link, LinkProps } from "../components/link";
import { Layout } from "../components/layout";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Grid, Paper } from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../components/social-media";
import { Constants } from "../utils/constants";
import { useI18n } from "../context/i18n";
import Head from "next/head";
import { Banner } from "../components/banner";
import { useUser } from "@auth0/nextjs-auth0";
import { useFetchUser } from "../lib/user";

type PostProps = {
  title: string,
  tags: string[],
  preview: string,
  content: string,
  publishDate: string,
  image: string,
}

type PostsProps = {
  posts: PostProps[],
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

const Posts: NextPage<PostsProps> = ({ posts }) => {
  const { i18n } = useI18n();
  return (
    <Layout>
      <Banner title="所有文章" >
      </Banner>

      <Container>
        {posts.map(post => (<Post {...post}></Post>))}
      </Container>
      <style jsx global>{`
        .section:nth-child(odd) {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </Layout >
  );
};

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  return {
    props: {
      posts: [
        {
          title: 'test title 1',
          tags: [],
          preview: 'This blog post shows a few different types of content that are supported and styled with Material styles. Basic typography, images, and code are all supported. You can extend these by modifying Markdown.js.1',
          content: 'content 1',
          publishDate: 'Date 1',
          image: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/295758836_372025898384054_1520161559750890202_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=TPIrSqFi5t4AX-KZLqf&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-qSkr-0_rHVGqGoU4fhqr5b0ZQ0AJW_NJD6l39rksvcg&oe=62EB70C9',
        },
        {
          title: 'test title 2',
          tags: [],
          preview: '2',
          content: 'content 2',
          publishDate: 'Date 2',
          image: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/295758836_372025898384054_1520161559750890202_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=TPIrSqFi5t4AX-KZLqf&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-qSkr-0_rHVGqGoU4fhqr5b0ZQ0AJW_NJD6l39rksvcg&oe=62EB70C9',
        },
        {
          title: 'test title 3',
          tags: [],
          preview: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.3',
          content: 'content 3',
          publishDate: 'Date 3',
          image: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/295758836_372025898384054_1520161559750890202_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=TPIrSqFi5t4AX-KZLqf&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-qSkr-0_rHVGqGoU4fhqr5b0ZQ0AJW_NJD6l39rksvcg&oe=62EB70C9',
        },
      ],
    },
    revalidate: 300, // In seconds
  }
}

export default Posts;
