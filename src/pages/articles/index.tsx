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
import { Pagination } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 20;

type PostsPageProps = {
  paginatedPosts: PublicPostsQuery["getPostsWithType"];
  page: number;
  pageSize: number;
};

const PostsPage: NextPage<PostsPageProps> = (prefetched) => {
  const { i18n } = useI18n();
  const [page, setPage] = useState(prefetched.page);
  const [pageSize, setPageSize] = useState(prefetched.pageSize);
  const [totalCount, setTotalCount] = useState(prefetched.paginatedPosts.total);
  const [items, setItems] = useState(prefetched.paginatedPosts.items);
  const initialRender = useRef(true);
  const client = useApolloClient();

  useEffect(() => {
    // Skip the effect on the first render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    getPaginatedPublishedPosts(
      ArticleType.Article,
      page,
      pageSize,
      client
    ).then((paginatedMembers) => {
      setItems(paginatedMembers.items);
      setTotalCount(paginatedMembers.total);
    });
  }, [page]);

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

      <Pagination
        page={page}
        count={Math.ceil(totalCount / pageSize)}
        onChange={(_e, page) => setPage(page)}
      />
      <CardList
        cards={items.map((p) => ({
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

export const getServerSideProps: GetServerSideProps<PostsPageProps> = async ({
  locale,
}) => {
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
    fetchPolicy: "network-only",
  });
  console.log(res.data.getPostsWithType.items.map((i) => i.type));
  return {
    ...res.data.getPostsWithType,
    items: res.data.getPostsWithType.items.map((p) => ({
      ...p,
      slug: p.slug || p.id,
    })),
  };
};

export default PostsPage;
