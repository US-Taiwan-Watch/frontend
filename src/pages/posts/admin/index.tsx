import type { GetStaticProps, NextPage } from "next";
import { Layout } from "../../../components/layout";
import { Banner } from "../../../components/banner";
import { useRouter } from "next/router";
import { CardList } from "../../../components/card-list";
import { useUserRole } from "../../../context/user-role";
import { Link } from "../../../components/link";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { PostProps } from "..";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from "@material-ui/core";
import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import Error from "next/error";
import { ImUserDocument } from "../../../lib/page-graphql/query-imuser.graphql.interface";
import { PostsDocument } from "../../../lib/page-graphql/query-posts.graphql.interface";
import { Article } from "../../../../common/models";

type PostsPageProps = {
  posts?: Article[],
}

const columns: GridColDef[] = [
  { field: 'title', headerName: 'Title', flex: 10, resizable: true },
  { field: 'status', headerName: 'Status' },
  {
    field: 'lastModified', headerName: 'Last Modified', width: 150, valueFormatter: date => {
      const lastModDate = new Date(date.value);
      return new Date().toLocaleDateString() === lastModDate.toLocaleDateString() ?
        lastModDate.toLocaleTimeString() : lastModDate.toLocaleDateString();
    }
  },
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
  if (!posts) {
    return <Error statusCode={404} />
  }
  const router = useRouter();
  const { isEditor } = useUserRole();
  return (
    <Layout>
      <Banner title="管理文章" >
      </Banner>
      <IconButton><AddCircleIcon /></IconButton>
      <DataGrid autoHeight={true} columns={columns} rows={posts.map(p => ({
        id: p.id,
        title: p.title,
        status: p.status,
        // lastModified: p.lastModified,
        // slug: p.slug,
      }))} />
    </Layout >
  );
};

PostsPage.getInitialProps = async ({ apolloClient }) => {
  // TODO: query real post 
  try {
    const data = await apolloClient?.query({
      query: PostsDocument,
      fetchPolicy: "network-only",
    });
    return {
      posts: data?.data.allArticles.map(post => ({
        id: post.id,
        title: post.title || '(Untitled)',
        content: post.content || '',
        // status: post.status || '',
      }))
    };
  } catch (err) {
    console.log(err);
    return { posts: undefined }
  }
}

export default withApollo()(PostsPage);
