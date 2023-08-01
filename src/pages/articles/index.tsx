import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
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

const PAGE_SIZE = 20;

type ArticleListPageProps = {
  paginatedPosts: PublicPostsQuery["getPostsWithType"];
  page: number;
  pageSize: number;
};

const ArticleListPage: NextPage<ArticleListPageProps> = (prefetched) => {
  const { i18n } = useI18n();
  const [articles, setArticles] = useState(prefetched.paginatedPosts.items);
  const client = useApolloClient();

  return (
    <Layout
      title={i18n.strings.articles.title}
      description={i18n.strings.articles.desc}
    >
      <Banner
        title={i18n.strings.articles.title}
        subtitle={i18n.strings.articles.desc}
      ></Banner>
      {/* {isEditor && <>
        <Link href={`/admin/posts`}>
          <Button variant="contained">Manage Posts</Button>
        </Link>
      </>} */}
      <PaginationControl
        defaultPage={1}
        defaultPageSize={PAGE_SIZE}
        total={prefetched.paginatedPosts.total}
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
          displayDate: new Date(p.publishedTime || 0).toLocaleDateString(), // change to pub date
          content: p.preview?.text || "",
          url: getPostUrl(p),
          image: p.imageSource || undefined,
        }))}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  ArticleListPageProps
> = async ({ locale }) => {
  const apolloClient = initApolloClientWithLocale(locale);
  return {
    props: {
      paginatedPosts: await getPaginatedPublishedPosts(
        ArticleType.Article,
        1,
        20,
        apolloClient
      ),
      page: 1,
      pageSize: PAGE_SIZE,
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
