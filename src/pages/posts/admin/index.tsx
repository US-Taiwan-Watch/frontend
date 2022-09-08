import { Layout } from "../../../components/layout";
import { Banner } from "../../../components/banner";
import { useRouter } from "next/router";
import { useUserRole } from "../../../context/user-role";
import { Link } from "../../../components/link";
import { Button, ButtonGroup } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from "@material-ui/core";
import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import Error from "next/error";
import { AllArticlesDocument } from "../../../lib/page-graphql/query-posts.graphql.interface";
import { Article } from "../../../../common/models";
import { useApolloClient } from "@apollo/client";
import { CreatePostDocument } from "../../../lib/page-graphql/mutation-create-post.graphql.interface";
import { useState } from "react";
import { DataGridPro, GridColDef, GridSortModel, GridValueFormatterParams } from "@mui/x-data-grid-pro";
import { useFetchUser } from "../../../lib/user";

type PostsPageProps = {
  posts?: Article[],
}

function dateFormatter(params: GridValueFormatterParams<number>): string {
  const date = new Date(params.value);
  return new Date().toLocaleDateString() === date.toLocaleDateString() ?
    date.toLocaleTimeString() : date.toLocaleDateString();
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 10, resizable: true },
  { field: 'isPublished', headerName: 'Status', valueFormatter: param => param.value === true ? 'Published' : 'Draft' },
  { field: 'createdTime', headerName: 'Created', width: 150, valueFormatter: dateFormatter, },
  { field: 'lastModifiedTime', headerName: 'Last Modified', width: 150, valueFormatter: dateFormatter, },
  {
    field: 'actions', headerName: 'Actions', width: 150, sortable: false, renderCell: params => (
      <ButtonGroup>
        <Link role="button" href={`admin/${params.id}`} sx={{ textDecoration: 'none' }}>
          <Button href={`admin/${params.id}`}>Edit</Button>
        </Link>
        <Link role="button" href={`${params.row.slug}`} sx={{ textDecoration: 'none' }}>
          <Button>View</Button>
        </Link>
      </ButtonGroup>)
  }
];

const PostsPage: NextPageWithApollo<PostsPageProps> = ({ posts }) => {
  const user = useFetchUser({ required: true });
  const router = useRouter();
  const { isEditor } = useUserRole();
  const apolloClient = useApolloClient();
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'lastModifiedTime',
      sort: 'desc',
    },
  ]);
  if (!posts) {
    return <Error statusCode={404} />
  }
  return (
    <Layout>
      <Banner title="管理文章" >
      </Banner>
      <IconButton onClick={() => {
        apolloClient.mutate({
          mutation: CreatePostDocument,
          fetchPolicy: "network-only",
        }).then(res => {
          if (res.data?.createEmptyArticle?.id) {
            router.push(`admin/${res.data?.createEmptyArticle?.id}`);
          }
        })
      }}>
        <AddCircleIcon />
      </IconButton>
      <DataGridPro autoHeight={true} columns={columns} rows={posts}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)} />
    </Layout >
  );
};

PostsPage.getInitialProps = async ({ apolloClient }) => {
  try {
    const data = await apolloClient?.query({
      query: AllArticlesDocument,
      fetchPolicy: "network-only",
    });
    return {
      posts: data?.data.allArticles.map(post => ({
        id: post.id,
        title: post.title || '(Untitled)',
        content: post.content || '',
        isPublished: post.isPublished || false,
        lastModifiedTime: post.lastModifiedTime || 0,
        createdTime: post.createdTime || 0,
        slug: post.slug || '',
      }))
    };
  } catch (err) {
    console.log(err);
    return { posts: undefined }
  }
}

export default withApollo()(PostsPage);
