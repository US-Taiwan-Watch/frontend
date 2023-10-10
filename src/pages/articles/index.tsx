import type { GetServerSideProps, NextPage } from "next";
import { Layout } from "../../components/layout";
import { Banner } from "../../components/banner";
import { CardList } from "../../components/card-list";
import { initApolloClientWithLocale } from "../../lib/with-apollo";
import { getPostUrl } from "../admin/[post-type]";
import { useI18n } from "../../context/i18n";
import { ArticleType } from "../../generated/graphql-types";
import {
  PublicPostsDocument,
  PublicPostsQuery,
} from "../../lib/page-graphql/query-public-posts.graphql.interface";
import { ApolloClient, useApolloClient } from "@apollo/client";
import { useState } from "react";
import { PaginationControl } from "../../components/pagination-control";
import { Container, Grid, Typography } from "@mui/material";
import { MediaCard } from "../../components/media-card";

const PAGE_SIZE = 20;
const PAGE_SEARCH_PAGE_NAME = "page";

type ArticleListPageProps = {
  paginatedPosts: PublicPostsQuery["getPostsWithType"];
  page: number;
};

const ArticleListPage: NextPage<ArticleListPageProps> = (prefetched) => {
  const { i18n } = useI18n();
  const [articles, setArticles] = useState(prefetched.paginatedPosts.items);
  const client = useApolloClient();

  return (
    <Layout
      title={i18n.strings.articles.title}
      description={i18n.strings.articles.desc}
      draftMode={true}
    >
      <Banner
        imageSrc="https://static.ustw.watch/public-image/website/banners/articles.png"
        draftMode={true}
      />
      {/* {isEditor && <>
        <Link href={`/admin/posts`}>
          <Button variant="contained">Manage Posts</Button>
        </Link>
      </>} */}
      <Container sx={{ my: 5 }}>
        <Grid container spacing={2}>
          <Grid item md={8} sm={12} xs={12}>
            <Typography component="h5" variant="h5" gutterBottom>
              {i18n.strings.articles.allArticles}
            </Typography>
            <hr />
            <PaginationControl
              defaultPage={prefetched.page}
              defaultPageSize={PAGE_SIZE}
              total={prefetched.paginatedPosts.total}
              urlSearchName={PAGE_SEARCH_PAGE_NAME}
              updateItems={async (page, pageSize) => {
                const paginatedPosts = await getPaginatedPublishedPosts(
                  ArticleType.Article,
                  page,
                  pageSize,
                  client
                );
                setArticles(paginatedPosts.items);
              }}
            />
            <CardList
              cards={articles.map((p) => ({
                title: p.title?.text || "",
                displayDate: new Date(
                  p.publishedTime || 0
                ).toLocaleDateString(), // change to pub date
                content: p.text || "",
                url: getPostUrl(p),
                image: p.imageSource || undefined,
              }))}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <MediaCard
              title={i18n.strings.articles.mediaCardTitle}
              description={i18n.strings.articles.mediaCardDesc}
              image="/assets/logo-large.png"
              borderColor="white"
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticleListPageProps
> = async ({ locale, res, query }) => {
  res.setHeader("Cache-Control", "public, max-age=60, immutable");
  let pageQuery = query[PAGE_SEARCH_PAGE_NAME];
  if (pageQuery === undefined) {
    pageQuery = "1";
  } else if (typeof pageQuery !== "string" || isNaN(parseInt(pageQuery))) {
    return {
      notFound: true,
    };
  }
  const page = parseInt(pageQuery);
  const apolloClient = initApolloClientWithLocale(locale);
  const paginatedPosts = await getPaginatedPublishedPosts(
    ArticleType.Article,
    page,
    20,
    apolloClient
  );
  if (paginatedPosts.items.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      paginatedPosts,
      page: page,
    },
  };
};

export const getPaginatedPublishedPosts = async (
  type: ArticleType,
  page: number,
  pageSize: number,
  client: ApolloClient<object>
): Promise<PublicPostsQuery["getPostsWithType"]> => {
  const res = await client.query({
    query: PublicPostsDocument,
    variables: {
      type,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      sortFields: ["publishedTime"],
      sortDirections: [-1],
    },
    fetchPolicy: "cache-first",
  });
  return {
    ...res.data.getPostsWithType,
    items: res.data.getPostsWithType.items.map((p) => ({
      ...p,
      slug: p.slug || p.id,
    })),
  };
};

export default ArticleListPage;
