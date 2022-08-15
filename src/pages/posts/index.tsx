import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { useRouter } from "next/router";
import { CardList } from "../../components/card-list";

export type PostProps = {
  id: string,
  slug: string,
  title: string,
  tags: string[],
  preview: string,
  content: string,
  publishDate: string,
  image: string,
  isPublished: boolean,
}

type PostsPageProps = {
  posts: PostProps[],
}

const PostsPage: NextPage<PostsPageProps> = ({ posts }) => {
  const router = useRouter();
  return (
    <Layout>
      <Banner title="所有文章" >
      </Banner>

      <CardList cards={posts.map(p => ({
        ...p,
        displayDate: p.publishDate,
        content: p.preview,
        url: `${router.pathname}/${p.slug}`
      }))} />

    </Layout >
  );
};

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => (
  {
    props: {
      posts: allPosts
    },
    revalidate: 300, // In seconds
  }
);

export default PostsPage;

// placeholder
export const allPosts = Array.from(Array(5)).map((_, i) => ({
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
