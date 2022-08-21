import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from "next";
import Typography from "@mui/material/Typography";
import { Link, LinkProps } from "../../../components/link";
import { Layout } from "../../../components/layout";
import { Box, Button, ButtonGroup, Card, CardActionArea, CardContent, CardHeader, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, TextareaAutosize, TextField } from "@mui/material";
import { SocialMediaIcon, socialMedias } from "../../../components/social-media";
import { Constants } from "../../../utils/constants";
import { useI18n } from "../../../context/i18n";
import Head from "next/head";
import { Banner } from "../../../components/banner";
import { useUser } from "@auth0/nextjs-auth0";
import { IUser, useFetchUser } from "../../../lib/user";
import { PostProps } from "..";
import { AdaptiveEditor } from "../../../components/component-adaptive-editor";
import { useUserRole } from "../../../context/user-role";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CoPresent } from "@mui/icons-material";
import Error from "next/error";
import { useApolloClient } from "@apollo/client";
import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import { ImUserDocument } from "../../../lib/page-graphql/query-imuser.graphql.interface";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { Article } from "../../../../common/models";
import { PostDocument } from "../../../lib/page-graphql/query-post.graphql.interface";
import { UpdateArticleWithIdDocument } from "../../../lib/page-graphql/mutation-update-post.graphql.interface";

type PostPageProps = {
  post?: Article,
}

const Post: React.FC<{ post: Article }> = ({ post }) => {
  const router = useRouter();
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const apolloClient = useApolloClient();
  const [savedPost, setSavedPost] = useState(post);
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => {
    if (updatedPost !== savedPost) {
      savePost();
    }
  }, [updatedPost, savedPost]);

  const updated = updatedPost !== savedPost;

  const savePost = () => {
    setIsSaving(true);
    apolloClient.mutate({
      mutation: UpdateArticleWithIdDocument,
      variables: { updateArticleWithIdId: post.id, ...savedPost },
      fetchPolicy: "network-only",
    }).then(res => {
      if (res.data?.updateArticleWithId?.id === post.id) {
        setSavedPost(updatedPost);
      }
    }).catch(err => {
      console.error("Failed to save")
    }).finally(() => setIsSaving(false));

  }

  const publishPost = () => {
    // TODO: publish
  }
  return (
    <Container>
      <Dialog fullWidth open={showSettings} onClose={() => setShowSettings(false)}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="slug"
            label="Post URL"
            fullWidth
            variant="standard"
          // value={post.slug}
          />
          Description:
          <TextareaAutosize
            placeholder="Empty"
            style={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button startIcon={<DeleteIcon />}>Delete post</Button>
          <Button>Close</Button>
        </DialogActions>
      </Dialog>
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
            {post.status === 'Publish' ?
              'This post is already published! Saving it will update the published post!' :
              'Are you sure to publish it?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveConfirmation(false)} autoFocus>Cancel</Button>
          <Button onClick={() => {
            setShowSaveConfirmation(false);
            if (post.status !== 'Publish') {
              publishPost();
            }
            else {
              savePost();
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
        <Button variant="contained" disabled={post.status === 'Publish' && !updated} onClick={() => setShowSaveConfirmation(true)}>
          {post.status === 'Publish' ? 'Update' : 'Publish'}
        </Button>
        <Typography sx={{ mx: 5 }}>{post.status === 'Publish' ? 'Published' : (isSaving ? 'Saving...' : 'Draft')}</Typography>
        <IconButton onClick={() => setShowSettings(true)}>
          <SettingsIcon />
        </IconButton>
      </Box>
      <Box alignItems="center" sx={{ paddingTop: 3, display: 'flex', flexDirection: 'column' }}>
        <TextField
          margin="dense"
          label="Title"
          fullWidth
          variant="standard"
          value={updatedPost.title}
          onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
        />
        <Typography variant="subtitle1" color="text.secondary">
          {post.pusblishTime}
        </Typography>
      </Box>
      <AdaptiveEditor
        value={updatedPost.content}
        viewOnly={false}
        onSave={val => setUpdatedPost({ ...updatedPost, content: val })} />
    </Container>
  );
}

const PostPage: NextPageWithApollo<PostPageProps> = ({ post }) => {
  if (!post) {
    return <Error statusCode={404} />
  }

  return <Post post={post} />;
};

PostPage.getInitialProps = async ({ req, query, apolloClient }) => {
  // TODO: query real post
  try {
    const res = await apolloClient?.query({
      query: PostDocument,
      variables: { articleId: query['post-id'] as string },
      fetchPolicy: "network-only",
    });
    const post = res?.data.article;
    if (!post) {
      return { post: undefined };
    }
    return {
      post: {
        id: post.id,
        title: post.title || '(Untitled)',
        content: post.content || '',
        // status: post.status || '',
      }
    };
  } catch (err) {
    return { post: undefined };
  }
}

export default withApollo()(PostPage);
