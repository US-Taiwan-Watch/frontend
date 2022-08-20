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


type PostPageProps = {
  post?: PostProps,
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const router = useRouter();
  const localStorageKey = `saved/${post.id}`;
  const [savedValue, setSavedValue] = useState(post.content);
  const [editorValue, setEditorValue] = useState(post.content);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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
    <>
      {/* <Banner title={post.title} subtitle={post.publishDate} /> */}
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
      </Container></>
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
  const data = await apolloClient?.query({
    query: ImUserDocument,
    variables: {},
    fetchPolicy: "network-only",
  });
  console.log(data)
  const allPosts: PostProps[] = Array.from(Array(5)).map((_, i) => ({
    id: `${i}`,
    isPublished: i % 2 === 0,
    slug: `slug${i}`,
    title: 'Lorem ipsum dolor sit amet, quas aliquid',
    tags: [],
    preview: 'Lorem ipsum dolor sit amet, quas aliquid imperdiet mea an, vix at putent epicurei. Mel quot admodum docendi in. No vel adhuc neglegentur, essent efficiantur ne est. Cu fabulas qualisque eum, dicta omnes elaboraret mel ea. Graecis repudiare consectetuer no mea.',
    publishDate: new Date().toLocaleDateString(),
    image: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/295758836_372025898384054_1520161559750890202_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=TPIrSqFi5t4AX-KZLqf&_nc_ht=scontent-sjc3-1.xx&oh=00_AT-qSkr-0_rHVGqGoU4fhqr5b0ZQ0AJW_NJD6l39rksvcg&oe=62EB70C9',
    content: JSON.stringify({
      "id": "62isql",
      "version": 1,
      "rows":
        [
          {
            "id": "5gx2dk",
            "cells":
              [
                {
                  "id": "5ejroj",
                  "size": 12,
                  "plugin":
                  {
                    "id": "ory/editor/core/content/slate",
                    "version": 1
                  },
                  "dataI18n":
                  {
                    "zh":
                    {
                      "slate":
                        [
                          {
                            "type": "HEADINGS/HEADING-TWO",
                            "data":
                            {
                              "align": "left"
                            },
                            "children":
                              [
                                {
                                  "text": "What is Lorem Ipsum?"
                                }
                              ]
                          },
                          {
                            "type": "PARAGRAPH/PARAGRAPH",
                            "data":
                            {
                              "align": "justify"
                            },
                            "children":
                              [
                                {
                                  "text": "Lorem Ipsum",
                                  "EMPHASIZE/STRONG": true
                                },
                                {
                                  "text": " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                                }
                              ]
                          },
                          {
                            "type": "HEADINGS/HEADING-TWO",
                            "data":
                            {
                              "align": "left"
                            },
                            "children":
                              [
                                {
                                  "text": "Why do we use it?"
                                }
                              ]
                          },
                          {
                            "type": "PARAGRAPH/PARAGRAPH",
                            "data":
                            {
                              "align": "justify"
                            },
                            "children":
                              [
                                {
                                  "text": "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
                                }
                              ]
                          },
                          {
                            "type": "HEADINGS/HEADING-TWO",
                            "data":
                            {
                              "align": "left"
                            },
                            "children":
                              [
                                {
                                  "text": "Where does it come from?"
                                }
                              ]
                          },
                          {
                            "type": "PARAGRAPH/PARAGRAPH",
                            "data":
                            {
                              "align": "justify"
                            },
                            "children":
                              [
                                {
                                  "text": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32."
                                }
                              ]
                          },
                          {
                            "type": "PARAGRAPH/PARAGRAPH",
                            "data":
                            {
                              "align": "justify"
                            },
                            "children":
                              [
                                {
                                  "text": "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham."
                                }
                              ]
                          },
                          {
                            "type": "HEADINGS/HEADING-TWO",
                            "data":
                            {
                              "align": "left"
                            },
                            "children":
                              [
                                {
                                  "text": "Where can I get some?"
                                }
                              ]
                          },
                          {
                            "type": "PARAGRAPH/PARAGRAPH",
                            "data":
                            {
                              "align": "justify"
                            },
                            "children":
                              [
                                {
                                  "text": "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
                                }
                              ]
                          }
                        ]
                    }
                  },
                  "rows":
                    [],
                  "inline": null
                }
              ]
          }
        ]
    }),
  }));
  const post = allPosts.find(p => p.id === query['post-id']);
  return { post };
}

export default withApollo()(PostPage);
