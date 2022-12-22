import React, { useMemo, useState, useEffect, useCallback } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { proxy } from "../redux/proxy";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Delete, Edit } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import AutocompleteTerminal from "./AutocompleteTerminal";
import CreateNewTerminal from "./CreateNewTerminal";
import { SetSelectedLocation } from "../redux/actions/shipmentsActions";
const Terminals_Rails = () => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { selected_locations } = useSelector(
    (state: RootState) => state.shipments
  );

  const [tableData, setTableData] = useState<any[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const getdata = async () => {
    const url = new URL(`${proxy}/v2/terminal_rail/query`);
    // url.searchParams.set(
    //   "start",
    //   `${pagination.pageIndex * pagination.pageSize}`
    // );
    url.searchParams.set("pageIndex", `${pagination.pageIndex}`);
    url.searchParams.set("pageSize", `${pagination.pageSize}`);
    const response = await fetch(url.href);
    const json = await response.json();
    setTableData(json.data);
    return json;
  };
  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    [
      "table-data",
      columnFilters,
      globalFilter,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
    ],
    () => getdata(),
    { keepPreviousData: true }
  );

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Edit: ({ cell, column, table }) => (
          <TextField
            variant="standard"
            color="success"
            value={cell.getValue()}
          />
        ),
      },
      {
        accessorKey: "frims_code",
        header: "frims_code",
        Edit: ({ cell, column, table }) => (
          <TextField
            variant="standard"
            color="success"
            value={cell.getValue()}
          />
        ),
      },
      {
        accessorKey: "type",
        header: "type",
        Edit: ({ cell, column, table }) => (
          <TextField
            variant="standard"
            color="success"
            value={cell.getValue()}
          />
        ),
      },
      {
        accessorKey: "location",
        accessorFn: (row) =>
          row.location
            ? ` ${row.location?.name} (${row.location?.country.country_code}${row.location?.location}) `
            : "",
        header: "Location",
        Edit: ({ cell, column, table }) => <AutocompleteTerminal />,
      },
    ],
    []
  );
  const handleDeleteRow = useCallback(
    async (row: MRT_Row<any>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      const res = await fetch(`${proxy}/v2/terminal_rail/${row.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res?.status < 300) {
        console.log("deleted!", pagination);
        refetch();
      }
    },
    [pagination, refetch]
  );
  const handleCreateNewRow = (values: any) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRow: MaterialReactTableProps<any>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values, table }) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      //send/receive api updates here
      const res = await fetch(`${proxy}/v2/terminal_rail/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            id: row.id,
            location: selected_locations ? { id: selected_locations } : null,
          },
        ]),
      });
      if (res?.status < 300) {
        refetch();
        exitEditingMode(); //required to exit editing mode and close modal
      }

      dispatch(SetSelectedLocation(null));
    };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={tableData ?? []} //data is undefined on first render
        manualPagination
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: "error",
                children: "Error loading data",
              }
            : undefined
        }
        editingMode="modal"
        enableEditing
        onEditingRowSave={handleSaveRow}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        getRowId={(originalRow) => originalRow.id}
        onPaginationChange={setPagination}
        renderTopToolbarCustomActions={() => (
          <Box>
            <Tooltip arrow title="Refresh Data">
              <IconButton onClick={() => refetch()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Terminal
            </Button>
          </Box>
        )}
        rowCount={data?.meta?.total ?? 0}
        state={{
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching,
        }}
      />
      <CreateNewTerminal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

const queryClient = new QueryClient();

const Terminals_Rails_Components = () => (
  <QueryClientProvider client={queryClient}>
    <Terminals_Rails />
  </QueryClientProvider>
);

export default Terminals_Rails_Components;
