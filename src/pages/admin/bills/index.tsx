import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import { ApolloClient, useApolloClient } from "@apollo/client";
import {
  BillsDocument,
  BillsQuery,
} from "../../../lib/page-graphql/query-bills.graphql.interface";
import { Box, Button, ButtonGroup, IconButton, Link } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { AdminLayout } from "../../../components/admin-layout";
import { Banner } from "../../../components/banner";
import { useEffect, useRef, useState } from "react";
import { GridSortModel } from "@mui/x-data-grid-pro";
import { useI18n } from "../../../context/i18n";
import router from "next/router";
import { getPostUrl } from "../[post-type]";
import { LoadingButton } from "@mui/lab";
import SyncIcon from "@mui/icons-material/Sync";
import { SyncBillDocument } from "../../../lib/page-graphql/mutation-sync-bill.graphql.interface";

interface BillsPageProps {
  initialBills?: BillsQuery["bills"];
}

const PAGE_SIZE_OPTIONS = [20, 50, 100, 200, 500, 1000, 2000];

const BillSyncButton: React.FC<{ billId: string }> = ({ billId }) => {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();

  return (
    <LoadingButton
      onClick={async () => {
        setLoading(true);
        await client.mutate({
          mutation: SyncBillDocument,
          variables: {
            billId,
          },
          fetchPolicy: "network-only",
        });
        setLoading(false);
      }}
      component="span"
      variant="contained"
      loading={loading}
    >
      <SyncIcon />
    </LoadingButton>
  );
};

// Page Component
const BillsPage: NextPageWithApollo<BillsPageProps> = ({ initialBills }) => {
  const client = useApolloClient();
  const { displayI18NText } = useI18n();
  const [currentBills, setCurrentBills] = useState(initialBills);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: "congress", sort: "desc" },
  ]);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
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
      width: 100,
    },
    {
      field: "billType",
      headerName: "Bill Type",
      width: 100,
    },
    {
      field: "billNumber",
      headerName: "Bill Number",
      width: 100,
    },
    {
      field: "introducedDate",
      headerName: "Introduced Date",
      width: 130,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 10,
      valueFormatter: (param) => displayI18NText(param.value),
      sortable: false,
    },
    {
      field: "summary",
      headerName: "Summary",
      flex: 10,
      valueFormatter: (param) => displayI18NText(param.value),
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,
      renderCell: (params) => (
        <ButtonGroup>
          <BillSyncButton billId={params.id as string} />
          <Link
            role="button"
            href={getPostUrl(params.row)}
            target="_blank"
            sx={{ textDecoration: "none" }}
          >
            <Button>Details</Button>
          </Link>
        </ButtonGroup>
      ),
    },
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
          sortModel={sortModel}
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
  const bills = await getBills(
    0,
    PAGE_SIZE_OPTIONS[0],
    ["congress"],
    [-1],
    apolloClient
  );
  return {
    initialBills: bills,
  };
};

export default withApollo()(BillsPage);
