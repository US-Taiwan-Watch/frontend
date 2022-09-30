import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  Snackbar,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useFetchUser } from "../../../lib/user";
import { AdaptiveEditor } from "../../../components/component-adaptive-editor";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import CloseIcon from "@mui/icons-material/Close";
import { useApolloClient } from "@apollo/client";
import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditorPageQueryDocument } from "../../../lib/page-graphql/query-post.graphql.interface";
import { UpdateArticleWithIdDocument } from "../../../lib/page-graphql/mutation-update-post.graphql.interface";
import LoadingButton from "@mui/lab/LoadingButton";
import { CardItem } from "../../../components/card-list";
import { uploadPostImage } from "../../../utils/image-upload-utils";
import { revalidatePage } from "../../../utils/revalidte-page";
import { LocaleSwitcher } from "../../../components/locale-switcher";
import { Article, ArticleType, User } from "../../../generated/graphql-types";
import { DeleteArticleDocument } from "../../../lib/page-graphql/delete-post.graphql.interface";
import { AdminLayout } from "../../../components/admin-layout";

type PostPageProps = {
  post?: Article;
  editors?: User[];
};

let timeout: NodeJS.Timeout | null = null;

enum Action {
  PUBLISH = "Publish",
  UNPUBLISH = "Unpublish",
  UPDATE = "Update",
  DELETE = "Delete",
}

enum State {
  DRAFT = "Draft",
  PUBLISHED = "Published",
  DELETED = "Deleted",
}

type StateTransition = {
  currentState: State;
  action: Action;
  newState: State;
};

const stateTransitions: StateTransition[] = [
  {
    currentState: State.DRAFT,
    action: Action.PUBLISH,
    newState: State.PUBLISHED,
  },
  {
    currentState: State.PUBLISHED,
    action: Action.UNPUBLISH,
    newState: State.DRAFT,
  },
  {
    currentState: State.PUBLISHED,
    action: Action.UPDATE,
    newState: State.PUBLISHED,
  },
  { currentState: State.DRAFT, action: Action.DELETE, newState: State.DELETED },
  {
    currentState: State.PUBLISHED,
    action: Action.DELETE,
    newState: State.DELETED,
  },
];

function getNextState(state: State, action: Action) {
  return stateTransitions.find(
    (t) => t.currentState === state && t.action === action
  )?.newState;
}

function getActions(state: State) {
  return stateTransitions
    .filter((t) => t.currentState === state)
    .map((t) => t.action);
}

const confirmationMessage = {
  [Action.PUBLISH]: "You sure to publish?",
  [Action.UNPUBLISH]: "You sure to unpublish?",
  [Action.UPDATE]: "You sure to update?",
  [Action.DELETE]: "You sure to delete?",
};

const shallowEqual = (
  obj1: { [key: string]: any },
  obj2: { [key: string]: any }
) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every((key) => obj1[key] === obj2[key]);

const PostEditor: React.FC<{ post: Article; editors: User[] }> = ({
  post,
  editors,
}) => {
  const user = useFetchUser({ required: true });
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [confirmingAction, setConfirmingAction] = useState<Action | null>(null);
  const [displayedConfirmingAction, setDisplayedConfirmingAction] =
    useState(confirmingAction);
  const [isActioning, setIsActioning] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [savedPost, setSavedPost] = useState(post);
  const [updatedPost, setUpdatedPost] = useState(post);
  const [uploadingCoverImage, setUploadingCoverImage] = useState(false);

  // To make the button text not disappeared during transition
  useEffect(() => {
    if (confirmingAction) {
      setDisplayedConfirmingAction(confirmingAction);
    }
  }, [confirmingAction]);

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
  const postUrl = `/${router.query["type"]}/${
    updatedPost.slug ? updatedPost.slug : updatedPost.id
  }`;

  const confirmAction = async () => {
    setIsActioning(true);
    const updatedPostWithState = { ...updatedPost };
    // FIXME: should unpublish also update the post?
    const nextState = confirmingAction && getNextState(state, confirmingAction);
    let success: boolean;
    if (nextState === State.DELETED) {
      success = await deletePost(updatedPost.id);
    } else {
      if (nextState) {
        updatedPostWithState.isPublished = nextState === State.PUBLISHED;
      }
      success = await savePost(updatedPostWithState);
    }
    if (!success) {
      // handle error
      return;
    }
    revalidatePage(postUrl);
    revalidatePage(`/${router.query["type"]}`);
    setUpdatedPost(updatedPostWithState);
    setConfirmingAction(null);
    setIsActioning(false);
    router.back();
  };

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
      console.error("Failed to save");
      return false;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const res = await apolloClient.mutate({
        mutation: DeleteArticleDocument,
        variables: { deleteArticleId: id },
        fetchPolicy: "network-only",
      });
      return !!res.data?.deleteArticle;
    } catch (err) {
      console.error("Failed to save");
      return false;
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isActioning}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={showSettings}
        onClose={() => setShowSettings(false)}
      >
        <IconButton
          aria-label="close"
          onClick={() => setShowSettings(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent
          sx={{
            flexDirection: "row",
            "& > *": { my: 1.5 },
          }}
        >
          <Typography variant="subtitle2">Preview</Typography>
          <CardItem
            url={postUrl}
            title={updatedPost.title || ""}
            content={updatedPost.preview || ""}
            displayDate=""
            image={updatedPost.imageSource || undefined}
          />
          <Box>
            <TextField
              fullWidth
              margin="dense"
              variant="standard"
              label="Cover Image"
              value={updatedPost.imageSource}
              // onChange={e => setUpdatedPost({ ...updatedPost, imageSource: e.target.value })}
              disabled
            />
            <input
              id="raised-button-file"
              hidden
              type="file"
              accept="image/png, image/jpeg"
              onChange={async (e) => {
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
              }}
            />
            <label htmlFor="raised-button-file">
              <LoadingButton
                component="span"
                variant="contained"
                loading={uploadingCoverImage}
              >
                Upload
              </LoadingButton>
            </label>
            <Button
              onClick={() =>
                setUpdatedPost({ ...updatedPost, imageSource: "" })
              }
            >
              Remove
            </Button>
          </Box>
          <Autocomplete
            multiple
            options={editors}
            disableClearable={true}
            value={updatedPost.authors?.map(
              (a) => editors.find((e) => e.id === a)!
            )}
            getOptionLabel={(option) => option.name!}
            onChange={(_, values) =>
              values.length > 0 &&
              setUpdatedPost({
                ...updatedPost,
                authors: values.map((v) => v.id),
              })
            }
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index, values) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  disabled={values.length === 1}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Authors"
                placeholder="Authors"
              />
            )}
          />
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            variant="standard"
            label="Post URL (Allowed characters: English characters, numbers, _ and -)"
            value={updatedPost.slug}
            placeholder={updatedPost.id}
            onChange={(e) =>
              setUpdatedPost({
                ...updatedPost,
                slug: e.target.value.replace(/[^\w-]/g, ""),
              })
            }
          />
          <TextField
            fullWidth
            margin="dense"
            variant="standard"
            multiline
            label="Description"
            value={updatedPost.preview}
            onChange={(e) =>
              setUpdatedPost({ ...updatedPost, preview: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setConfirmingAction(Action.DELETE)}
          >
            Delete post
          </Button>
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
          {displayedConfirmingAction}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {displayedConfirmingAction &&
              confirmationMessage[displayedConfirmingAction]}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmingAction(null)}
            autoFocus
            disabled={isActioning}
          >
            Cancel
          </Button>
          <LoadingButton onClick={confirmAction} loading={isActioning}>
            {displayedConfirmingAction}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar open={isAutoSaving} message="Saving..." />
      <Box sx={{ m: 2, display: "flex" }}>
        <Box
          sx={{
            my: 1,
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            "& > *": { mx: 1.5 },
          }}
        >
          <Button variant="outlined" onClick={() => router.back()}>
            Back
          </Button>
          <Chip label={post.isPublished ? "Published" : "Draft"} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "right",
            flexDirection: "row",
            "& > *": { mx: 1.61 },
          }}
        >
          <LocaleSwitcher />
          {actions.includes(Action.PUBLISH) && (
            <Button
              variant="contained"
              onClick={() => setConfirmingAction(Action.PUBLISH)}
            >
              Publish
            </Button>
          )}
          {actions.includes(Action.UNPUBLISH) && (
            <Button
              variant="contained"
              onClick={() => setConfirmingAction(Action.UNPUBLISH)}
            >
              Unpublish
            </Button>
          )}
          {actions.includes(Action.UPDATE) && (
            <Button
              variant="contained"
              disabled={!updated}
              onClick={() => setConfirmingAction(Action.UPDATE)}
            >
              Update
            </Button>
          )}
          <IconButton onClick={() => setShowSettings(true)}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
      <Container>
        <Box
          alignItems="center"
          sx={{ paddingTop: 3, display: "flex", flexDirection: "column" }}
        >
          <TextField
            inputProps={{ style: { fontSize: 30, lineHeight: 1.2 } }} // font size of input textl
            margin="dense"
            label="Title"
            fullWidth
            multiline
            variant="standard"
            value={updatedPost.title}
            onChange={(e) =>
              setUpdatedPost({
                ...updatedPost,
                title: e.target.value.replace(/\n/g, ""),
              })
            }
          />
        </Box>
        <AdaptiveEditor
          value={updatedPost.content || undefined}
          viewOnly={false}
          onSave={(val) => setUpdatedPost({ ...updatedPost, content: val })}
        />
      </Container>
    </>
  );
};

export const PostEditorPage: NextPageWithApollo<PostPageProps> = ({
  post,
  editors,
}) => {
  if (!post) {
    return <Error statusCode={404} />;
  }

  return (
    <AdminLayout title="編輯文章">
      <PostEditor post={post} editors={editors || []} />
    </AdminLayout>
  );
};

PostEditorPage.getInitialProps = async ({ query, apolloClient }) => {
  const type =
    query["type"] === "post"
      ? ArticleType.Post
      : query["type"] === "posters"
      ? ArticleType.Poster
      : null;
  if (!type) {
    return { post: undefined };
  }
  try {
    const res = await apolloClient?.query({
      query: EditorPageQueryDocument,
      variables: { articleId: query["post-id"] as string },
      fetchPolicy: "network-only",
    });
    const post = res?.data.article;
    if (!post) {
      return { post: undefined };
    }
    return {
      post,
      editors: res.data.editors,
    };
  } catch (err) {
    return { post: undefined };
  }
};

export default withApollo()(PostEditorPage);
