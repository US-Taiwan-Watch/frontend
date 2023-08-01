import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { getPaginatedPublishedPosts } from ".";
import { Loading } from "../../components/loading";
import { getStaticPathsWithLocale } from "../../utils/page-utils";
import { PostContent } from "../../components/post-content";
import {
  Breadcrumbs,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {
  PublicPostDocument,
  PublicPostQuery,
} from "../../lib/page-graphql/query-public-post.graphql.interface";
import { ArticleType } from "../../generated/graphql-types";
import { getPostPublishDate, getPostUrl } from "../admin/[post-type]";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { initApolloClientWithLocale } from "../../lib/with-apollo";
import { Link } from "../../components/link";
import { SmallCardItem } from "../../components/card-list";

export type PostPageProps = {
  post?: PublicPostQuery["getPublicArticle"];
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const router = useRouter();
  useEffect(() => {
    if (!post?.publishedTime) {
      return;
    }
    const slugs = router.query["slugs"];
    const date = getPostPublishDate(post.publishedTime);
    if (
      slugs?.length === 3 &&
      slugs[0] === date.year &&
      slugs[1] === date.month
    ) {
      return;
    }
    router.replace(getPostUrl(post), undefined, { shallow: true });
  }, [post, router]);
  const theme = useTheme();

  if (!post) {
    return <Loading />;
  }
  return (
    <Layout
      title={post.title?.text || undefined}
      type="article"
      description={post.preview?.text || ""}
      image={post.imageSource || undefined}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/articles">
                Articles
              </Link>
            </Breadcrumbs>
            <Typography component="h4" variant="h4" gutterBottom>
              {post.title?.text}
            </Typography>
            <hr />
            <PostContent post={post} />
          </Grid>
          <Grid item md={4}>
            <Paper
              sx={{
                textAlign: "center",
                px: 5,
                py: 4,
                my: 5,
                backgroundColor: theme.palette.primary.light,
                borderRadius: "10px",
                boxShadow: 0,
              }}
            >
              <Typography component="h6" variant="h6">
                #觀測站底加辣
              </Typography>
              <Typography variant="body1">
                「觀測站底加辣」已推出第三季，每週不間斷地為聽眾帶來台美關係最新動態與分析，並時不時推出專題報導，以訪問來賓包括前參謀總長李喜明、美國聖湯瑪斯大學國際研究葉耀元教授等。謝謝每一位聽眾的陪伴，過去超過
                150 集的 podcast 累績下載超過 100
                萬，收聽地區除了台美外，還包括中國、日本、越南、香港、澳洲等。讓我們繼續用耳朵追時事、破解台美中地緣政治
                主持群：李可心、陳方隅、Jerry、Ledo、Ting
              </Typography>
            </Paper>
            <Typography component="h5" variant="h5" gutterBottom>
              相關文章
            </Typography>
            <hr />
            <Grid container>
              <Grid item xs={12} sm={6} md={12} sx={{ px: 2 }}>
                <SmallCardItem
                  url="test"
                  title="test"
                  content="test!"
                  displayDate="2022/2/2"
                  image={post.imageSource || undefined}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={12} sx={{ px: 2 }}>
                <SmallCardItem
                  url="test"
                  title="test"
                  content="test!"
                  displayDate="2022/2/2"
                  image={post.imageSource || undefined}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths<{ slugs: string[] }> = async ({
  locales,
}) => {
  const apolloClient = initApolloClientWithLocale();
  const posts = (
    await getPaginatedPublishedPosts(ArticleType.Article, 1, 20, apolloClient)
  ).items;
  return {
    paths: getStaticPathsWithLocale(
      // language!
      posts.map((post) => {
        if (!post.publishedTime) {
          return {
            params: {
              slugs: [post.slug as string],
            },
          };
        }
        const date = getPostPublishDate(post.publishedTime);
        return {
          params: {
            slugs: [date?.year, date?.month, post.slug as string],
          },
        };
      }),
      locales
    ),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
  locale,
}) => {
  const slugs = params?.slugs;
  if (!slugs) {
    return { notFound: true };
  }
  const apolloClient = initApolloClientWithLocale(locale);
  try {
    const data = await apolloClient.query({
      query: PublicPostDocument,
      variables: { slug: slugs[slugs.length - 1] },
      fetchPolicy: "network-only",
    });
    const post = data.data.getPublicArticle;
    if (!post || post.type !== ArticleType.Article || !post.publishedTime) {
      return { notFound: true };
    }
    return { props: { post }, revalidate: 300 };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};

export default PostPage;
