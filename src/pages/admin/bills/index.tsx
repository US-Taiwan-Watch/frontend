import { NextPageWithApollo, withApollo } from "../../../lib/with-apollo";
import { ApolloClient, useApolloClient } from "@apollo/client";
import {
  BillsDocument,
  BillsQuery,
} from "../../../lib/page-graphql/query-bills.graphql.interface";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Link,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  DataGridPro,
  GridActionsCellItem,
  GridColumns,
  GridFilterModel,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid-pro";
import { AdminLayout } from "../../../components/admin-layout";
import { Banner } from "../../../components/banner";
import { useEffect, useRef, useState } from "react";
import { GridSortModel } from "@mui/x-data-grid-pro";
import { getPostUrl } from "../[post-type]";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SyncIcon from "@mui/icons-material/Sync";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import {
  SyncBillDocument,
  SyncBillMutation,
} from "../../../lib/page-graphql/mutation-sync-bill.graphql.interface";
import { LocaleSwitcher } from "../../../components/locale-switcher";
import { BillInput } from "../../../generated/graphql-types";
import { AddBillDocument } from "../../../lib/page-graphql/mutation-add-bill.graphql.interface";
import { DeleteBillDocument } from "../../../lib/page-graphql/mutation-delete-bill.graphql.interface";
import { UpdateBillDocument } from "../../../lib/page-graphql/mutation-update-bill.graphql.interface";

interface BillsPageProps {
  initialBills?: BillsQuery["bills"];
}

const PAGE_SIZE_OPTIONS = [20, 50, 100, 200, 500, 1000, 2000];

const BillSyncButton: React.FC<{
  billId: string;
  onUpdateBill: (bill: SyncBillMutation["syncBill"]) => void;
}> = ({ billId, onUpdateBill }) => {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();

  return (
    <GridActionsCellItem
      icon={
        <Tooltip title="Sync">
          <SyncIcon />
        </Tooltip>
      }
      label="Sync"
      className="textPrimary"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const res = await client.mutate({
          mutation: SyncBillDocument,
          variables: {
            billId,
          },
          fetchPolicy: "network-only",
        });
        setLoading(false);
        if (res.data?.syncBill) {
          onUpdateBill(res.data.syncBill);
        }
      }}
      color="inherit"
    />
  );
};

const BillDeleteButton: React.FC<{
  billId: string;
  onComplete: (success: boolean) => void;
}> = ({ billId, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();

  return (
    <GridActionsCellItem
      icon={
        <Tooltip title="Delete">
          <DeleteIcon />
        </Tooltip>
      }
      label="Delete"
      className="textPrimary"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const res = await client.mutate({
          mutation: DeleteBillDocument,
          variables: {
            deleteBillId: billId,
          },
          fetchPolicy: "network-only",
        });
        setLoading(false);
        onComplete(!!res.data?.deleteBill);
      }}
      color="inherit"
    />
  );
};

const ToolBar: React.FC<{ onAddClick: () => void }> = ({ onAddClick }) => (
  <GridToolbarContainer>
    <Button color="primary" startIcon={<AddIcon />} onClick={onAddClick}>
      Add bill
    </Button>
    <GridToolbarQuickFilter key="search" />
  </GridToolbarContainer>
);

// Page Component
const BillsPage: NextPageWithApollo<BillsPageProps> = ({ initialBills }) => {
  const client = useApolloClient();
  const [currentBills, setCurrentBills] = useState(initialBills);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: "congress", sort: "desc" },
  ]);
  const [showEditingDialog, setShowEditingDialog] = useState(false);
  const [editingBill, setEditingBill] = useState<BillInput>({
    congress: 0,
    billType: "",
    billNumber: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isMounted = useRef(false);
  const [queryKeywords, setQueryKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    setIsLoading(true);
    getBills(
      page,
      pageSize,
      sortModel.map((sm) => sm.field),
      sortModel.map((sm) => (sm.sort === "asc" ? 1 : -1)),
      queryKeywords,
      client
    ).then((bills) => {
      setCurrentBills(bills);
      setIsLoading(false);
    });
  }, [pageSize, page, sortModel, queryKeywords]);

  if (!currentBills) {
    return null;
  }

  const columns: GridColumns = [
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
      headerName: "English Title",
      flex: 10,
      valueFormatter: (param) => param.value?.en || "",
      sortable: false,
    },
    {
      field: "title_zh",
      headerName: "中文標題",
      flex: 10,
      valueGetter: (params) => params.row.title?.zh || "",
      sortable: false,
    },
    {
      field: "summary",
      headerName: "English Summary",
      flex: 10,
      valueFormatter: (param) => param.value?.en || "",
      sortable: false,
    },
    {
      field: "summary_zh",
      headerName: "中文總結",
      flex: 10,
      valueGetter: (params) => params.row.summary?.zh || "",
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,
      getActions: (params) => [
        <BillSyncButton
          billId={params.id as string}
          onUpdateBill={(bill) => {
            setCurrentBills({
              ...currentBills,
              items: currentBills.items.map((b) =>
                b.id === bill?.id ? bill : b
              ),
            });
          }}
        />,
        <GridActionsCellItem
          icon={
            <Tooltip title="Edit">
              <EditIcon />
            </Tooltip>
          }
          label="Edit"
          className="textPrimary"
          onClick={() => {
            setEditingBill(params.row);
            setIsEditing(true);
            setShowEditingDialog(true);
          }}
          color="inherit"
        />,
        <BillDeleteButton
          billId={params.id as string}
          onComplete={(success) => {
            if (!success) {
              return;
            }
            setCurrentBills({
              ...currentBills,
              items: currentBills.items.filter((b) => b.id !== params.id),
            });
          }}
        />,
        <Link
          href={getPostUrl(params.row)}
          target="_blank"
          sx={{ textDecoration: "none" }}
        >
          <GridActionsCellItem
            icon={
              <Tooltip title="Read More">
                <ReadMoreIcon />
              </Tooltip>
            }
            label="Read More"
            // onClick={handleDeleteClick(id)}
            color="inherit"
          />
        </Link>,
      ],
    },
  ];

  const updateBill = () => {
    setIsSaving(true);
    client
      .mutate({
        mutation: UpdateBillDocument,
        variables: {
          bill: {
            ...Object.fromEntries(
              Object.entries(editingBill).filter(
                ([k, _]) => !["__typename", "id"].includes(k)
              )
            ),
            title: Object.fromEntries(
              Object.entries(editingBill.title || {}).filter(
                ([k, _]) => k !== "__typename"
              )
            ),
            summary: Object.fromEntries(
              Object.entries(editingBill.summary || {}).filter(
                ([k, _]) => k !== "__typename"
              )
            ),
          } as BillInput,
        },
        fetchPolicy: "network-only",
      })
      .then((res) => {
        if (res.data?.updateBill) {
          setCurrentBills({
            ...currentBills,
            items: currentBills.items.map((b) =>
              b.id === res.data?.updateBill?.id ? res.data.updateBill : b
            ),
          });
        }
        setShowEditingDialog(false);
        setIsSaving(false);
      });
  };

  const addNewBill = () => {
    setIsSaving(true);
    client
      .mutate({
        mutation: AddBillDocument,
        variables: {
          bill: editingBill,
        },
        fetchPolicy: "network-only",
      })
      .then((res) => {
        if (res.data?.addBill) {
          setCurrentBills({
            ...currentBills,
            items: [res.data.addBill, ...currentBills.items],
          });
        }
        setShowEditingDialog(false);
        setIsSaving(false);
      });
  };

  return (
    <AdminLayout title={"管理法案"}>
      <Banner title={"管理法案"}>
        <LocaleSwitcher />
      </Banner>
      <Box>
        <Dialog
          fullWidth
          maxWidth="lg"
          open={showEditingDialog}
          onClose={() => setShowEditingDialog(false)}
        >
          <DialogTitle>
            {isEditing ? "Editing Bill" : "Add New Bill"}
          </DialogTitle>
          <DialogContent
            sx={{
              flexDirection: "row",
              "& > *": { my: 1.5 },
            }}
          >
            <FormControl>
              <TextField
                disabled={isEditing}
                required
                autoFocus
                margin="dense"
                variant="standard"
                label="Congress"
                type="number"
                value={editingBill.congress || ""}
                onChange={(e) =>
                  setEditingBill({
                    ...editingBill,
                    congress: parseInt(e.target.value),
                  })
                }
              />
              <FormHelperText>
                The congress number. For example, the value can be 117. This is
                part of the identifier of a bill. Cannot change after added.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <TextField
                disabled={isEditing}
                required
                margin="dense"
                variant="standard"
                label="Bill Type"
                value={editingBill.billType}
                onChange={(e) =>
                  setEditingBill({ ...editingBill, billType: e.target.value })
                }
              />
              <FormHelperText>
                The type of bill. Value can be hr, s, hjres, sjres, hconres,
                sconres, hres, or sres. This is part of the identifier of a
                bill. Cannot change after added.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <TextField
                disabled={isEditing}
                required
                margin="dense"
                variant="standard"
                label="Bill Number"
                type="number"
                value={editingBill.billNumber || ""}
                onChange={(e) =>
                  setEditingBill({
                    ...editingBill,
                    billNumber: parseInt(e.target.value),
                  })
                }
              />
              <FormHelperText>
                The bill’s assigned number. For example, the value can be 3076.
                This is part of the identifier of a bill. Cannot change after
                added.
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                autoFocus={isEditing}
                margin="dense"
                variant="standard"
                label="English Title"
                value={editingBill.title?.en || ""}
                onChange={(e) =>
                  setEditingBill({
                    ...editingBill,
                    title: {
                      ...editingBill.title,
                      en: e.target.value,
                    },
                  })
                }
              />
              <FormHelperText>
                This could be overwritten by the data sync from the official
                website
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="dense"
                variant="standard"
                label="中文標題"
                value={editingBill.title?.zh || ""}
                onChange={(e) =>
                  setEditingBill({
                    ...editingBill,
                    title: {
                      ...editingBill.title,
                      zh: e.target.value,
                    },
                  })
                }
              />
              <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="dense"
                variant="standard"
                label="English Summary"
                multiline
                value={editingBill.summary?.en || ""}
                onChange={(e) =>
                  setEditingBill({
                    ...editingBill,
                    summary: {
                      ...editingBill.summary,
                      en: e.target.value,
                    },
                  })
                }
              />
              <FormHelperText>
                This could be overwritten by the data sync from the official
                website
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="dense"
                variant="standard"
                label="中文 Summary"
                multiline
                value={editingBill.summary?.zh || ""}
                onChange={(e) =>
                  setEditingBill({
                    ...editingBill,
                    summary: {
                      ...editingBill.summary,
                      zh: e.target.value,
                    },
                  })
                }
              />
              <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="dense"
                variant="standard"
                label="Internal Notes"
                multiline
              />
              <FormHelperText>
                This is internal only, not shown to public
              </FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowEditingDialog(false)}>Cancel</Button>
            <LoadingButton
              variant="contained"
              onClick={() => (isEditing ? updateBill() : addNewBill())}
              loading={isSaving}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </Dialog>
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
          components={{
            Toolbar: ToolBar,
          }}
          componentsProps={{
            toolbar: {
              onAddClick: () => {
                setIsEditing(false);
                setEditingBill({
                  congress: 0,
                  billType: "",
                  billNumber: 0,
                });
                setShowEditingDialog(true);
              },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          onSortModelChange={(sortModel) => {
            if (currentBills.total > pageSize) {
              setSortModel(sortModel);
              setPage(0);
            }
          }}
          disableColumnFilter={currentBills.total > pageSize}
          // checkboxSelection
          filterMode="server"
          onFilterModelChange={(filterModel: GridFilterModel) =>
            setQueryKeywords(filterModel.quickFilterValues || [])
          }
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
  keywords?: string[],
  apolloClient?: ApolloClient<object>
) => {
  const res = await apolloClient?.query({
    query: BillsDocument,
    variables: {
      offset: page * pageSize,
      limit: pageSize,
      sortFields,
      sortDirections,
      query: { keywords: keywords || [] },
    },
    fetchPolicy: "cache-first",
  });
  return res?.data.bills;
};

BillsPage.getInitialProps = async ({ apolloClient }) => {
  const bills = await getBills(
    0,
    PAGE_SIZE_OPTIONS[0],
    ["congress"],
    [-1],
    undefined,
    apolloClient
  );
  return {
    initialBills: bills,
  };
};

export default withApollo()(BillsPage);
