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
import { ArticleDocument } from "../../../lib/page-graphql/query-post.graphql.interface";
import { UpdateArticleWithIdDocument } from "../../../lib/page-graphql/mutation-update-post.graphql.interface";
import LoadingButton from '@mui/lab/LoadingButton';

type PostPageProps = {
  post?: Article,
}

let timeout: NodeJS.Timeout | null = null;

enum Action {
  PUBLISH = 'Publish',
  UNPUBLISH = 'Unpublish',
  UPDATE = 'Update',
}

const confirmationMessage = {
  [Action.PUBLISH]: 'You sure to publish?',
  [Action.UNPUBLISH]: 'You sure to unpublish?',
  [Action.UPDATE]: 'You sure to update?',
}

const Post: React.FC<{ post: Article }> = ({ post }) => {
  const user = useFetchUser({ required: true });
  const router = useRouter();
  const [confirmingAction, setConfirmingAction] = useState<Action | null>(null);
  const [actioning, setActioning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const apolloClient = useApolloClient();
  const [savedPost, setSavedPost] = useState(post);
  const [updatedPost, setUpdatedPost] = useState(post);

  useEffect(() => {
    if (updatedPost !== savedPost) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(savePost, 500);
    }
  }, [updatedPost, savedPost]);

  const updated = updatedPost !== savedPost;

  const confirmAction = () => {
    setActioning(true);
    // TODO: other action based on action
    const actionResult = savePost();

    actionResult.then(success => {
      setActioning(false);
      if (success) {
        setConfirmingAction(null);
        return;
      }
      // TODO: handle action error
    })
    // router.back();
  }

  const savePost = () => {
    setIsSaving(true);
    return apolloClient.mutate({
      mutation: UpdateArticleWithIdDocument,
      variables: { updateArticleWithIdId: post.id, ...updatedPost },
      fetchPolicy: "network-only",
    }).then(res => {
      if (res.data?.updateArticleWithId?.id === post.id) {
        setSavedPost(updatedPost);
      }
      return true;
    }).catch(err => {
      console.error("Failed to save")
      return false;
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
            autoFocus fullWidth margin="dense" variant="standard"
            label="Post URL"
            value={updatedPost.slug}
            onChange={e => setUpdatedPost({ ...updatedPost, slug: e.target.value })}
          />
          Description:
          <TextareaAutosize style={{ width: "100%" }}
            value={updatedPost.preview}
            onChange={e => setUpdatedPost({ ...updatedPost, preview: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button startIcon={<DeleteIcon />}>Delete post</Button>
          <Button onClick={() => setShowSettings(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmingAction !== null}
        onClose={() => setConfirmingAction(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Sure you want to save?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmingAction && confirmationMessage[confirmingAction]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmingAction(null)} autoFocus>Cancel</Button>
          <LoadingButton onClick={confirmAction} loading={actioning} loadingPosition="start">{confirmingAction}</LoadingButton>
        </DialogActions>
      </Dialog>
      <Box sx={{
        paddingTop: 3, display: 'flex', flexDirection: 'row', '& > *': { mx: 1.5 },
      }}>
        <Button variant="outlined" onClick={() => router.back()}>Back</Button>
        <Button variant="contained" disabled={post.isPublished} onClick={() => setConfirmingAction(Action.PUBLISH)}>
          Publish
        </Button>
        <Button variant="contained" disabled={!post.isPublished || !updated} onClick={() => setConfirmingAction(Action.UPDATE)}>
          Update
        </Button>
        <Typography sx={{ mx: 5 }}>{post.isPublished ? 'Published' : (isSaving ? 'Saving...' : 'Draft')}</Typography>
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
      query: ArticleDocument,
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
        title: post.title || `(Untitled ${new Date(post.createdTime || 0).toLocaleString()})`,
        content: post.content || '',
        isPublished: post.isPublished || false,
        lastModifiedTime: post.lastModifiedTime || 0,
        createdTime: post.createdTime || 0,
        slug: post.slug || '',
        preview: post.preview || '',
      }
    };
  } catch (err) {
    return { post: undefined };
  }
}

export default withApollo()(PostPage);
