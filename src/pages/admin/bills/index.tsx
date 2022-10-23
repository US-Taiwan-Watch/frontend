import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import { ApolloClient, useApolloClient } from "@apollo/client";
import {
  BillsDocument,
  BillsQuery,
} from "../../../lib/page-graphql/query-bills.graphql.interface";
import { Box } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { AdminLayout } from "../../../components/admin-layout";
import { Banner } from "../../../components/banner";
import { useEffect, useState } from "react";
import { GridSortModel } from "@mui/x-data-grid-pro";

interface BillsPageProps {
  initialBills?: BillsQuery["bills"];
}

const PAGE_SIZE_OPTIONS = [20, 50, 100, 200, 500, 1000, 2000];

// Page Component
const BillsPage: NextPageWithApollo<BillsPageProps> = ({ initialBills }) => {
  const client = useApolloClient();
  const [currentBills, setCurrentBills] = useState(initialBills);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  useEffect(() => {
    setIsLoading(true);
    console.log(page, pageSize);
    getBills(
      page,
      pageSize,
      sortModel.map((sm) => sm.field),
      sortModel.map((sm) => (sm.sort === "asc" ? 1 : -1)),
      client
    ).then((bills) => {
      setCurrentBills(bills);
      setIsLoading(false);
    });
  }, [pageSize, page, sortModel]);

  if (!currentBills) {
    return null;
  }

  const columns: GridColDef[] = [
    {
      field: "congress",
      headerName: "Congress",
      width: 150,
    },
    {
      field: "billType",
      headerName: "Bill Type",
      width: 150,
    },
    {
      field: "billNumber",
      headerName: "Bill Number",
      width: 150,
    },
    {
      field: "introducedDate",
      headerName: "Introduced Date",
      // type: "number",
      width: 130,
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
    <AdminLayout title={"管理法案"}>
      <Banner title={"管理法案"} />
      <Box>
        <DataGridPro
          editMode="row"
          pagination={true}
          autoHeight={true}
          columns={columns}
          loading={isLoading}
          rows={currentBills.items}
          rowCount={currentBills.total}
          rowsPerPageOptions={PAGE_SIZE_OPTIONS}
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          onPageChange={(page) => setPage(page)}
          onPageSizeChange={(pageSize) => setPageSize(pageSize)}
          sortingMode={currentBills.total > pageSize ? "server" : "client"}
          onSortModelChange={(sortModel) => {
            if (currentBills.total > pageSize) {
              setSortModel(sortModel);
              setPage(0);
            }
          }}
          disableColumnFilter={currentBills.total > pageSize}
          // checkboxSelection
          disableSelectionOnClick
          // components={{
          //   Pagination: () => (
          //     <Pagination
          //       color="primary"
          //       count={Math.ceil(currentBills.total / pageSize)}
          //       page={page + 1}
          //       onChange={(_, value) => setPage(value - 1)}
          //     />
          //   ),
          // }}
        />
      </Box>
    </AdminLayout>
  );
};

const getBills = async (
  page: number,
  pageSize: number,
  sortFields?: string[],
  sortDirections?: number[],
  apolloClient?: ApolloClient<object>
) => {
  const res = await apolloClient?.query({
    query: BillsDocument,
    variables: {
      offset: page * pageSize,
      limit: pageSize,
      sortFields,
      sortDirections,
    },
    fetchPolicy: "network-only",
  });
  return res?.data.bills;
};

BillsPage.getInitialProps = async ({ apolloClient }) => {
  const bills = await getBills(0, PAGE_SIZE_OPTIONS[0], [], [], apolloClient);
  return {
    initialBills: bills,
  };
};

export default withApollo()(BillsPage);
