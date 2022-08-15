import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Link, LinkProps } from "../../../components/link";
import { Layout } from "../../../components/layout";
import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper } from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../../../components/social-media";
import { Constants } from "../../../utils/constants";
import { useI18n } from "../../../context/i18n";
import Head from "next/head";
import { Banner } from "../../../components/banner";
import { useUser } from "@auth0/nextjs-auth0";
import { useFetchUser } from "../../../lib/user";
import { allPosts, PostProps } from "..";
import { AdaptiveEditor } from "../../../components/component-adaptive-editor";
import { useUserRole } from "../../../context/user-role";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CoPresent } from "@mui/icons-material";
import Error from "next/error";

type PostPageProps = {
  post?: PostProps,
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

enum EditingState {
  EDIT = 1,
  SAVED = 2,
  PREVIEW = 3,
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  if (!post) {
    return <Error statusCode={404} />
  }

  const localStorageKey = `saved/${post.id}`;
  const [savedValue, setSavedValue] = useState(post.content);
  const [editorValue, setEditorValue] = useState(post.content);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        setSavedValue(saved);
        setEditorValue(saved);
      }
    }
  }, []);

  useEffect(() => {
    if (editorValue !== savedValue) {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        savePost(editorValue);
      }, 300)
    }
  }, [editorValue, savedValue]);

  const updated = editorValue !== savedValue;

  const savePost = (val: string) => {
    localStorage.setItem(localStorageKey, editorValue);
    setSavedValue(editorValue);
  }

  const publishPost = () => {
    // TODO: publish
  }

  return (
    <Layout>
      <Banner title={post.title} subtitle={post.publishDate} />
      <Container>
        <Dialog
          open={showSaveConfirmation}
          onClose={() => setShowSaveConfirmation(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Sure you want to save?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {post.isPublished ?
                'This post is already published! Saving it will update the published post!' :
                'Are you sure to publish it?'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowSaveConfirmation(false)} autoFocus>Cancel</Button>
            <Button onClick={() => {
              setShowSaveConfirmation(false);
              if (!post.isPublished) {
                publishPost();
              }
              else {
                savePost(editorValue);
              }
              router.back();
            }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Box sx={{
          paddingTop: 3, display: 'flex', flexDirection: 'row', '& > *': { mx: 1.5 },
        }}>
          <Button variant="outlined" onClick={() => router.back()}>Back</Button>
          <Button variant="contained" disabled={post.isPublished && !updated} onClick={() => setShowSaveConfirmation(true)}>
            {post.isPublished ? 'Update' : 'Publish'}
          </Button>
          <Typography sx={{ mx: 5 }}>{post.isPublished ? 'Published' : (isSaving ? 'Saving...' : 'Draft')}</Typography>
        </Box>
        <Box alignItems="center" sx={{ paddingTop: 3, display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.publishDate}
          </Typography>
        </Box>
        <AdaptiveEditor
          value={editorValue}
          viewOnly={false}
          onSave={val => setEditorValue(val)} />
      </Container>
    </Layout >
  );
};

PostPage.getInitialProps = async ({ req, query }) => {
  // TODO: Check user role here
  // if (!params || typeof params['post-id'] !== 'string') {
  //   return { notFound: true };
  // }
  const post = allPosts.find(p => p.id === query['post-id']);
  return { post }
}

export default PostPage;
