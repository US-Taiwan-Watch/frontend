import { Banner } from "../../../components/banner";
import { useRouter } from "next/router";
import { Link } from "../../../components/link";
import { Button, ButtonGroup } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@material-ui/core";
import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import { AdminAllPostsDocument } from "../../../lib/page-graphql/query-posts.graphql.interface";
import { ApolloError, useApolloClient } from "@apollo/client";
import { CreatePostDocument } from "../../../lib/page-graphql/mutation-create-post.graphql.interface";
import { useState } from "react";
import {
  DataGridPro,
  GridColDef,
  GridSortModel,
  GridValueFormatterParams,
} from "@mui/x-data-grid-pro";
import { AdminLayout } from "../../../components/admin-layout";
import { Article, ArticleType } from "../../../generated/graphql-types";
import { Loading } from "../../../components/loading";
import { useI18n } from "../../../context/i18n";
import Error from "next/error";

export const PostsAdminPage: NextPageWithApollo<{
  posts?: Article[];
  statusCode?: number;
}> = ({ posts, statusCode }) => {
  const { i18n } = useI18n();
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "lastModifiedTime",
      sort: "desc",
    },
  ]);
  if (statusCode === 404) {
    return <Error statusCode={404} />;
  }
  if (!posts && statusCode !== 403) {
    return <Error statusCode={404} title="Failed to find or fetch posts" />;
  }

  function dateFormatter(
    params: GridValueFormatterParams<number | null>
  ): string {
    if (!params.value) {
      return "";
    }
    const date = new Date(params.value);
    return new Date().toLocaleDateString() === date.toLocaleDateString()
      ? date.toLocaleTimeString()
      : date.toLocaleDateString();
  }

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 10, resizable: true },
    {
      field: "isPublished",
      headerName: "Status",
      valueFormatter: (param) => (param.value === true ? "Published" : "Draft"),
    },
    {
      field: "pusblishTime",
      headerName: "Published",
      width: 150,
      valueFormatter: dateFormatter,
    },
    {
      field: "createdTime",
      headerName: "Created",
      width: 150,
      valueFormatter: dateFormatter,
    },
    {
      field: "lastModifiedTime",
      headerName: "Last Modified",
      width: 150,
      valueFormatter: dateFormatter,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <ButtonGroup>
          <Link
            role="button"
            href={`/${router.asPath}/${params.id}`}
            sx={{ textDecoration: "none" }}
          >
            <Button>Edit</Button>
          </Link>
          <Link
            role="button"
            href={getPostUrl(params.row)}
            target="_blank"
            sx={{ textDecoration: "none" }}
          >
            <Button>View</Button>
          </Link>
        </ButtonGroup>
      ),
    },
  ];
  if (!posts) {
    return <Loading />;
  }
  const title = i18n.formatString(
    i18n.strings.admin.posts.managePosts,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    i18n.strings.posts[getPostType(router.query["post-type"])!]
  ) as string;

  return (
    <AdminLayout title={title}>
      <Banner title={title} />
      <IconButton
        onClick={() => {
          apolloClient
            .mutate({
              mutation: CreatePostDocument,
              variables: {
                title: `(Untitled ${new Date().toLocaleString()})`,
                type: getPostType(router.query["post-type"]),
              },
              fetchPolicy: "network-only",
            })
            .then((res) => {
              if (res.data?.addArticle?.id) {
                router.push(`${router.asPath}/${res.data?.addArticle?.id}`);
              }
            });
        }}
      >
        <AddCircleIcon />
      </IconButton>
      <DataGridPro
        autoHeight={true}
        columns={columns}
        rows={posts}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
      />
    </AdminLayout>
  );
};

PostsAdminPage.getInitialProps = async ({ query, apolloClient }) => {
  const type = getPostType(query["post-type"]);
  if (!type) {
    return { statusCode: 404 };
  }
  try {
    const data = await apolloClient?.query({
      query: AdminAllPostsDocument,
      fetchPolicy: "network-only",
    });
    return {
      posts: data?.data.getAllArticles
        .map((post) => ({
          ...post,
          pusblishTime: post.isPublished ? post.pusblishTime : null,
        }))
        .filter((p) => p.type === type),
    };
  } catch (err) {
    console.log(err);
    if ((err as ApolloError).message.includes("Access denied")) {
      return { statusCode: 403 };
    }
    return { statusCode: 500 };
  }
};

export const getPostTypeSlug = (type?: ArticleType | null) => {
  if (type === ArticleType.Poster) {
    return "posters";
  }
  return "articles";
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPostType = (type?: any) => {
  if (type === "posters") {
    return ArticleType.Poster;
  }
  if (type === "articles") {
    return ArticleType.Article;
  }
  return null;
};

type PartialPost = {
  id: string;
  isPublished?: boolean | null;
  pusblishTime?: number | null;
  slug?: string | null;
  type?: ArticleType | null;
};

export const getPostUrl = (post: PartialPost) => {
  const typeSlug = getPostTypeSlug(post.type);
  if (post.type === ArticleType.Poster) {
    return `/${typeSlug}/${post.slug ? post.slug : post.id}`;
  }
  if (post.isPublished && post.pusblishTime) {
    const date = getPostPublishDate(post.pusblishTime);
    return `/${typeSlug}/${date?.year}/${date?.month}/${
      post.slug ? post.slug : post.id
    }`;
  }
  return `/${typeSlug}/${post.slug ? post.slug : post.id}`;
};

export const getPostPublishDate = (time: number) => {
  const date = new Date(time);
  return {
    year: date.getUTCFullYear().toString(),
    month: (date.getUTCMonth() + 1).toString(),
    day: date.getUTCDate().toString(),
  };
};

export default withApollo()(PostsAdminPage);
