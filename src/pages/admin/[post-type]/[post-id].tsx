import Typography from "@mui/material/Typography";
import {
  Alert,
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
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import { AdaptiveEditor } from "../../../components/component-adaptive-editor";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import CloseIcon from "@mui/icons-material/Close";
import { ApolloError, useApolloClient } from "@apollo/client";
import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  EditorPageDocument,
  EditorPageQuery,
} from "../../../lib/page-graphql/query-post.graphql.interface";
import { UpdateArticleWithIdDocument } from "../../../lib/page-graphql/mutation-update-post.graphql.interface";
import LoadingButton from "@mui/lab/LoadingButton";
import { CardListItem } from "../../../components/card-list";
import { uploadPostImage } from "../../../utils/image-upload-utils";
import { revalidatePage } from "../../../utils/revalidte-page";
import { ArticleType, User } from "../../../generated/graphql-types";
import { DeleteArticleDocument } from "../../../lib/page-graphql/delete-post.graphql.interface";
import { AdminLayout } from "../../../components/admin-layout";
import { getPostType, getPostUrl } from ".";
import { useI18n } from "../../../context/i18n";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { resolveI18NText } from "../../../utils/graphql-util";
import { I18NText } from "../../../../common/models/i18n.interface";

type PostPageProps = {
  post?: EditorPageQuery["getArticle"];
  editors?: User[];
  statusCode?: number;
};

let timeout: NodeJS.Timeout | null = null;

enum Action {
  PUBLISH = "Publish",
  UNPUBLISH = "Unpublish",
  UPDATE = "Update",
  DELETE = "Delete",
  CHANGE_TYPE = "Change Type",
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
  {
    currentState: State.DRAFT,
    action: Action.CHANGE_TYPE,
    newState: State.DRAFT,
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

const shallowEqual = (
  obj1: { [key: string]: any },
  obj2: { [key: string]: any }
) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every((key) => obj1[key] === obj2[key]);

const PostEditor: React.FC<{
  post: EditorPageQuery["getArticle"];
  editors: User[];
}> = ({ post, editors }) => {
  // It's alway non-null
  const postNonNull = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...post!,
    authors: post?.authorInfos?.map((a) => a.id),
  };
  type PostType = typeof postNonNull;
  const { i18n } = useI18n();
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [confirmingAction, setConfirmingAction] = useState<Action | null>(null);
  const [displayedConfirmingAction, setDisplayedConfirmingAction] =
    useState(confirmingAction);
  const [isActioning, setIsActioning] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [updatedPost, setUpdatedPost] = useState<PostType>({
    ...postNonNull,
    title: Object.fromEntries(
      Object.entries(postNonNull.title || {}).filter(
        ([k, _]) => k !== "__typename"
      )
    ),
    preview: Object.fromEntries(
      Object.entries(postNonNull.preview || {}).filter(
        ([k, _]) => k !== "__typename"
      )
    ),
  });
  const [savedPost, setSavedPost] = useState(updatedPost);
  const [uploadingCoverImage, setUploadingCoverImage] = useState(false);
  const [publishedTime, setPublishedTime] = useState<Dayjs | null>(
    dayjs(post?.publishedTime)
  );
  const [lang, setLang] = useState(i18n.getLanguage());

  // To make the button text not disappeared during transition
  useEffect(() => {
    if (confirmingAction) {
      setDisplayedConfirmingAction(confirmingAction);
    }
  }, [confirmingAction]);

  useEffect(() => {
    if (publishedTime?.isValid()) {
      setUpdatedPost({
        ...updatedPost,
        publishedTime: publishedTime.valueOf(),
      });
    }
  }, [publishedTime]);

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

  const postType = getPostType(router.query["post-type"]);
  const postTypeString = postType?.toLowerCase();
  const changeableType =
    updatedPost.type === ArticleType.Poster
      ? ArticleType.Article
      : ArticleType.Poster;

  const confirmationMessage = {
    [Action.PUBLISH]: `Are you sure to publish this ${postTypeString}? It will become public to everone.`,
    [Action.UNPUBLISH]: `Are you sure to unpublish ${postTypeString}? It will be taken down from the public and become a draft. You can publish it later again.`,
    [Action.UPDATE]: `Are you sure to update the public ${postTypeString}? This will update the public ${postTypeString}`,
    [Action.DELETE]: `Are you sure to delete this ${postTypeString}? Please don't do it if you're not sure. You can always make it a draft instead. A draft ${postTypeString} is not visible to public. If you delete it by accident, please reach out to jingwan@ustw.watch`,
    [Action.CHANGE_TYPE]: `Are you sure to convert this ${postTypeString} to ${changeableType.toLowerCase()}?`,
  };

  const state = savedPost.isPublished ? State.PUBLISHED : State.DRAFT;
  const updated = !shallowEqual(updatedPost, savedPost);
  const actions = getActions(state);
  const postUrl = getPostUrl(updatedPost);
  const title = resolveI18NText(
    lang,
    new I18NText(Object.fromEntries(Object.entries(updatedPost.title || {})))
  );
  const preview = resolveI18NText(
    lang,
    new I18NText(Object.fromEntries(Object.entries(updatedPost.preview || {})))
  );

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
      if (confirmingAction === Action.CHANGE_TYPE) {
        updatedPostWithState.type = changeableType;
      }
      success = await savePost(updatedPostWithState);
    }
    if (!success) {
      setConfirmingAction(null);
      setIsActioning(false);
      return;
    }
    revalidatePage(postUrl);
    revalidatePage(`/${router.query["post-type"]}`);
    // setUpdatedPost(updatedPostWithState);
    // setConfirmingAction(null);
    // setIsActioning(false);
    router.back();
  };

  const savePost = async (postToSave: PostType) => {
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
      console.error(err);
      setErrorMsg("Something went wrong! Failed to save.");
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

  const changeTypeButton = (
    <Button
      color="secondary"
      variant="text"
      onClick={() => setConfirmingAction(Action.CHANGE_TYPE)}
      disabled={!actions.includes(Action.CHANGE_TYPE)}
    >
      Change type
    </Button>
  );

  const langSeletor = (
    <FormControl sx={{ width: 120 }} variant="filled">
      <InputLabel id="demo-simple-select-label">Post Language</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        size="small"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <MenuItem value="zh">中文</MenuItem>
        <MenuItem value="en">EN</MenuItem>
      </Select>
    </FormControl>
  );

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
          <Typography variant="subtitle2" sx={{ marginBottom: 3 }}>
            Preview
          </Typography>
          {langSeletor}
          <CardListItem
            url={`${process.env.NEXT_PUBLIC_BASE_URL}/${lang}${postUrl}`}
            title={title || ""}
            content={preview || ""}
            displayDate=""
            image={updatedPost.imageSource || undefined}
          />
          <Box>
            <TextField
              fullWidth
              margin="dense"
              variant="standard"
              label="Cover Image"
              value={updatedPost.imageSource || ""}
              onChange={(e) =>
                setUpdatedPost({ ...updatedPost, imageSource: e.target.value })
              }
              // disabled
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
            value={updatedPost.authorInfos || []}
            getOptionLabel={(option) => option.name || ""}
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
              <FormControl fullWidth>
                <TextField
                  {...params}
                  variant="standard"
                  label="Authors"
                  placeholder="Authors"
                />
                {postType === ArticleType.Poster && (
                  <FormHelperText error={true}>
                    Authors won't be showing for posters
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <FormControl fullWidth>
            <TextField
              autoFocus
              margin="dense"
              variant="standard"
              label="Post URL"
              value={updatedPost.slug || ""}
              placeholder={updatedPost.id}
              onChange={(e) =>
                setUpdatedPost({
                  ...updatedPost,
                  slug: e.target.value.replace(/[^\w-]/g, ""),
                })
              }
            />
            <FormHelperText>
              Allowed characters: English characters, numbers, _ and -
            </FormHelperText>
          </FormControl>
          <TextField
            fullWidth
            margin="dense"
            variant="standard"
            multiline
            label="Description"
            value={preview}
            onChange={(e) =>
              setUpdatedPost({
                ...updatedPost,
                preview: {
                  ...updatedPost.preview,
                  [lang]: e.target.value.replace(/\n/g, ""),
                },
              })
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
          <LoadingButton
            variant="contained"
            onClick={confirmAction}
            loading={isActioning}
          >
            {displayedConfirmingAction}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Snackbar open={isAutoSaving}>
        <Alert severity="info">Saving...</Alert>
      </Snackbar>
      <Snackbar open={!!errorMsg}>
        <Alert onClose={() => setErrorMsg(null)} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
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
          <Chip label={postNonNull.isPublished ? "Published" : "Draft"} />
          {actions.includes(Action.UPDATE) && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props: any) => (
                  <TextField {...props} size="small" />
                )}
                label="Published Time (local time)"
                value={publishedTime}
                onChange={(value: Dayjs | null) => setPublishedTime(value)}
              />
            </LocalizationProvider>
          )}
          {actions.includes(Action.CHANGE_TYPE) ? (
            changeTypeButton
          ) : (
            <Tooltip title="Unpublish it before changing the type">
              <span>{changeTypeButton}</span>
            </Tooltip>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "right",
            flexDirection: "row",
            "& > *": { mx: 2 },
          }}
        >
          {langSeletor}
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
            value={title}
            onChange={(e) =>
              setUpdatedPost({
                ...updatedPost,
                title: {
                  ...updatedPost.title,
                  [lang]: e.target.value.replace(/\n/g, ""),
                },
              })
            }
          />
        </Box>
        <AdaptiveEditor
          value={updatedPost.content || undefined}
          viewOnly={false}
          onSave={(val) => setUpdatedPost({ ...updatedPost, content: val })}
          postLang={lang}
        />
      </Container>
    </>
  );
};

export const PostEditorPage: NextPageWithApollo<PostPageProps> = ({
  post,
  editors,
  statusCode,
}) => {
  const router = useRouter();
  const { i18n } = useI18n();
  const postType = getPostType(router.query["post-type"]);
  if (statusCode === 404 || !postType) {
    return <Error statusCode={404} />;
  }
  if (!post && statusCode !== 403) {
    return <Error statusCode={404} title="Post not found" />;
  }

  return (
    <AdminLayout
      title={
        i18n.formatString(
          i18n.strings.admin.posts.editPost,
          i18n.strings.post[postType]
        ) as string
      }
    >
      {post && <PostEditor post={post} editors={editors || []} />}
    </AdminLayout>
  );
};

PostEditorPage.getInitialProps = async ({ query, apolloClient }) => {
  const type = getPostType(query["post-type"]);
  if (!type) {
    return { statusCode: 404 };
  }
  try {
    const res = await apolloClient?.query({
      query: EditorPageDocument,
      variables: { articleId: query["post-id"] as string },
      fetchPolicy: "network-only",
    });
    return {
      post: res?.data.getArticle || undefined,
      editors: res?.data.editors,
    };
  } catch (err) {
    console.error(err);
    if ((err as ApolloError).message.includes("Access denied")) {
      return { statusCode: 403 };
    }
    return { statusCode: 500 };
  }
};

export default withApollo()(PostEditorPage);
