import Typography from "@mui/material/Typography";
import { Backdrop, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Input, TextareaAutosize, TextField } from "@mui/material";
import { useFetchUser } from "../../../lib/user";
import { AdaptiveEditor } from "../../../components/component-adaptive-editor";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { useApolloClient } from "@apollo/client";
import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { Article } from "../../../../common/models";
import { ArticleDocument } from "../../../lib/page-graphql/query-post.graphql.interface";
import { UpdateArticleWithIdDocument } from "../../../lib/page-graphql/mutation-update-post.graphql.interface";
import LoadingButton from '@mui/lab/LoadingButton';
import { urlObjectKeys } from "next/dist/shared/lib/utils";
import { CardItem } from "../../../components/card-list";
import { uploadPostImage } from "../../../utils/image-upload-utils";

type PostPageProps = {
  post?: Article,
}

let timeout: NodeJS.Timeout | null = null;

enum Action {
  PUBLISH = 'Publish',
  UNPUBLISH = 'Unpublish',
  UPDATE = 'Update',
}

enum State {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
}

type StateTransition = {
  currentState: State,
  action: Action,
  newState: State,
}

const stateTransitions: StateTransition[] = [
  { currentState: State.DRAFT, action: Action.PUBLISH, newState: State.PUBLISHED },
  { currentState: State.PUBLISHED, action: Action.UNPUBLISH, newState: State.DRAFT },
  { currentState: State.PUBLISHED, action: Action.UPDATE, newState: State.PUBLISHED },
];

function getNextState(state: State, action: Action) {
  return stateTransitions.find(t => t.currentState === state && t.action === action)?.newState;
}

function getActions(state: State) {
  return stateTransitions.filter(t => t.currentState === state).map(t => t.action);
}

const confirmationMessage = {
  [Action.PUBLISH]: 'You sure to publish?',
  [Action.UNPUBLISH]: 'You sure to unpublish?',
  [Action.UPDATE]: 'You sure to update?',
}

const shallowEqual = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key]);

const Post: React.FC<{ post: Article }> = ({ post }) => {
  const user = useFetchUser({ required: true });
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [confirmingAction, setConfirmingAction] = useState<Action | null>(null);
  const [isActioning, setIsActioning] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [savedPost, setSavedPost] = useState(post);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [uploadingCoverImage, setUploadingCoverImage] = useState(false);

  useEffect(() => {
    if (state === State.DRAFT && updated && !isActioning) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(async () => {
        setIsAutoSaving(true);
        await savePost(updatedPost);
        setIsAutoSaving(false);
      }, 500);
    }
  }, [updatedPost]);

  const state = savedPost.isPublished ? State.PUBLISHED : State.DRAFT;
  const updated = !shallowEqual(updatedPost, savedPost);
  const actions = getActions(state);

  const confirmAction = async () => {
    setIsActioning(true);
    const updatedPostWithState = updatedPost;
    // FIXME: should unpublish also update the post?
    const nextState = confirmingAction && getNextState(state, confirmingAction);
    if (nextState) {
      updatedPostWithState.isPublished = nextState === State.PUBLISHED;
    }
    const success = await savePost(updatedPostWithState);
    if (!success) {
      // handle error
    }
    setUpdatedPost(updatedPostWithState);
    setConfirmingAction(null);
    setIsActioning(false);
    router.back();
  }

  const savePost = async (postToSave: Article) => {
    try {
      const res = await apolloClient.mutate({
      mutation: UpdateArticleWithIdDocument,
      variables: { updateArticleWithIdId: postToSave.id, ...postToSave },
      fetchPolicy: "network-only",
      });
      if (res.data?.updateArticleWithId?.id !== postToSave.id) {
        return false;
      }
      setSavedPost(postToSave);
      return true;
    } catch (err) {
      console.error("Failed to save")
      return false;
    }
  };


  return (
    <Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isActioning}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog fullScreen open={showSettings} onClose={() => setShowSettings(false)}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2">
            Preview
          </Typography>
          <CardItem url={`/posts/${updatedPost.slug}`}
            title={updatedPost.title || ''}
            content={updatedPost.preview || ''}
            displayDate=''
            image={updatedPost.imageSource} />

          <input
            id="raised-button-file" hidden type="file" accept="image/png, image/jpeg"
            onChange={async e => {
              if (!e.target.files) {
                return;
              }
              setUploadingCoverImage(true);
              try {
                const text = await uploadPostImage(e.target.files[0]);
                setUpdatedPost({ ...updatedPost, imageSource: text });
              } catch (err) {
                // TODO: handle action error
              } finally {
                setUploadingCoverImage(false);
              }
            }} />
          <label htmlFor="raised-button-file">
            <LoadingButton component="span" variant="contained" loading={uploadingCoverImage}>
              Upload Cover Image
            </LoadingButton>
          </label>
          <Button onClick={() => setUpdatedPost({ ...updatedPost, imageSource: undefined })}>
            Remove Cover Image
          </Button>
          <TextField
            autoFocus fullWidth margin="dense" variant="standard"
            label="Post URL"
            value={updatedPost.slug}
            placeholder={updatedPost.id}
            onChange={e => setUpdatedPost({ ...updatedPost, slug: e.target.value })}
          />
          <TextField
            fullWidth margin="dense" variant="standard"
            multiline
            label="Description"
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
          <Button onClick={() => setConfirmingAction(null)} autoFocus disabled={isActioning}>Cancel</Button>
          <LoadingButton onClick={confirmAction} loading={isActioning} loadingPosition="start">{confirmingAction}</LoadingButton>
        </DialogActions>
      </Dialog>
      <Box sx={{
        paddingTop: 3, display: 'flex', flexDirection: 'row', '& > *': { mx: 1.5 },
      }}>
        <Button variant="outlined" onClick={() => router.back()}>Back</Button>
        <Button variant="contained" disabled={!actions.includes(Action.PUBLISH)} onClick={() => setConfirmingAction(Action.PUBLISH)}>
          Publish
        </Button>
        <Button variant="contained" disabled={!actions.includes(Action.UNPUBLISH)} onClick={() => setConfirmingAction(Action.UNPUBLISH)}>
          Unpublish
        </Button>
        <Button variant="contained" disabled={!actions.includes(Action.UPDATE) || !updated} onClick={() => setConfirmingAction(Action.UPDATE)}>
          Update
        </Button>
        <Typography sx={{ mx: 5 }}>{post.isPublished ? 'Published' : (isAutoSaving ? 'Saving...' : 'Draft')}</Typography>
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
        imageSource: post.imageSource || '',
      }
    };
  } catch (err) {
    return { post: undefined };
  }
}

export default withApollo()(PostPage);
