import { Banner } from "../../../components/banner";
import { useRouter } from "next/router";
import { Link } from "../../../components/link";
import { Button, ButtonGroup } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@material-ui/core";
import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import { AllArticlesDocument } from "../../../lib/page-graphql/query-posts.graphql.interface";
import { useApolloClient } from "@apollo/client";
import { CreatePostDocument } from "../../../lib/page-graphql/mutation-create-post.graphql.interface";
import { useState } from "react";
import {
  DataGridPro,
  GridColDef,
  GridSortModel,
  GridValueFormatterParams,
} from "@mui/x-data-grid-pro";
import { useFetchUser } from "../../../lib/user";
import { AdminLayout } from "../../../components/admin-layout";
import { Article, ArticleType } from "../../../generated/graphql-types";
import { Loading } from "../../../components/loading";

export const PostsAdminPage: NextPageWithApollo<{ posts?: Article[] }> = ({
  posts,
}) => {
  const _ = useFetchUser({ required: true });
  const router = useRouter();
  const apolloClient = useApolloClient();
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "lastModifiedTime",
      sort: "desc",
    },
  ]);
  // if (!loading && !isEditor) {
  //   return <Error statusCode={403} title="You don't have permission to access this page" />
  // }

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
            href={`${router.pathname}/${params.id}`}
            sx={{ textDecoration: "none" }}
          >
            <Button href={`${router.pathname}/${params.id}`}>Edit</Button>
          </Link>
          <Link
            role="button"
            href={`${router.pathname.replace("/admin", "")}/${
              params.row.slug || params.id
            }`}
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
  return (
    <AdminLayout title="管理文章">
      <Banner title="管理文章" />
      <IconButton
        onClick={() => {
          apolloClient
            .mutate({
              mutation: CreatePostDocument,
              variables: {
                title: `(Untitled ${new Date().toLocaleString()})`,
                // FIXME: Not a very good approach
                type: router.pathname.includes("posters")
                  ? ArticleType.Poster
                  : ArticleType.Post,
              },
              fetchPolicy: "network-only",
            })
            .then((res) => {
              if (res.data?.addArticle?.id) {
                router.push(`${router.pathname}/${res.data?.addArticle?.id}`);
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

PostsAdminPage.getInitialProps = async ({ apolloClient }) => {
  try {
    const data = await apolloClient?.query({
      query: AllArticlesDocument,
      fetchPolicy: "network-only",
    });
    return {
      posts: data?.data.allArticles
        .map((post) => ({
          ...post,
          pusblishTime: post.isPublished ? post.pusblishTime : null,
        }))
        .filter((p) => p.type === ArticleType.Post),
    };
  } catch (err) {
    console.log(err);
    return { posts: undefined };
  }
};

export default withApollo()(PostsAdminPage);
