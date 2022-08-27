/* SSR -> Bill list */
// incremental-static-regeneration -> Bill
// To Do:
// 1. GraphQL setting & query
// 2. table ui
// 3. Typescript setting

import { NextPageWithApollo, withApollo } from "../../lib/with-apollo";
import { useApolloClient } from "@apollo/client";
import {
  BillsDocument,
  BillsQueryVariables,
} from "../../lib/page-graphql/query-bills.graphql.interface";
import { Box } from "@mui/material";
import { GetServerSideProps } from "next";
import * as React from "react";
import { gql } from "@apollo/client";
import { makeStyles, createStyles } from "@mui/styles";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import client from "../apollo-client";
const useStyles = makeStyles((theme) => ({
  root: {},
}));
interface BillsPageProps {
  data?: any; // To Do: 換成query params
}

// Page Component
const BillsPage: NextPageWithApollo<BillsPageProps> = ({ data }) => {
  console.log("data", data);
  const columns: GridColDef[] = [
    { field: "billNumber", headerName: "Bill Number", width: 90 },
    {
      field: "billType",
      headerName: "Bill Type",
      width: 150,
    },
    {
      field: "congress",
      headerName: "Congress",
      width: 150,
    },
    {
      field: "introducedDate",
      headerName: "Introduce dDate",
      type: "number",
      width: 110,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data?.data?.bills?.items}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        getRowId={(e) => {
          console.log("e", e);

          return e.billNumber;
        }}
      />
    </Box>
  );
};

BillsPage.getInitialProps = async ({ apolloClient }) => {
  const data = await apolloClient?.query({
    query: BillsDocument,
    variables: {
      // offset,
      // limit,
    },
    fetchPolicy: "network-only",
  });
  return {
    data,
  };
};
// export default BillsPage;
export default withApollo()(BillsPage);
