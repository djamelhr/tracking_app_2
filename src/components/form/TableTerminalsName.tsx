import React, { useMemo, useState, useEffect, useCallback } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import RefreshIcon from "@mui/icons-material/Refresh";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { proxy } from "../redux/proxy";
import {
  FormControl,
  Box,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Delete, Edit } from "@mui/icons-material";
import AutocompleteListTerminal from "./autoCompleteListTerminals";
import { getAllRails } from "../redux/actions/terminalsActions";
import CountrySelect from "./autoCompleteMu";
import { SetSelectedTerminal } from "../redux/actions/shipmentsActions";
const Example = () => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { selected_locations, selected_terminal } = useSelector(
    (state: RootState) => state.shipments
  );
  useEffect(() => {
    dispatch(getAllRails());
  });

  const [tableData, setTableData] = useState<any[]>([]);
  const [type, setType] = useState("terminal");

  const getdata = async () => {
    const url = new URL(`${proxy}/v2/terminal_rail/names`);
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
            disabled
            id="outlined-disabled"
            variant="standard"
            color="success"
            value={cell.getValue()}
          />
        ),
      },
      {
        accessorFn: (row) =>
          row.shipping_line ? `${row.shipping_line?.nickname}` : "",
        header: "Shipping line",
        Edit: ({ cell, column, table }) => (
          <TextField
            disabled
            id="outlined-disabled"
            variant="standard"
            value={cell.getValue()}
          />
        ),
      },
      {
        accessorFn: (row) =>
          row.terminal_rail
            ? `${
                row.terminal_rail?.nickname ? row.terminal_rail?.nickname : ""
              }  ${row.terminal_rail?.name}  (${row.terminal_rail?.frims_code})`
            : "",
        header: "Terminal",
        //autocomplet from mui
        Edit: ({ cell, column, table }) => <CountrySelect />,
      },
      {
        accessorFn: (row) =>
          row.terminal_rail
            ? row.terminal_rail?.location
              ? `${row.terminal_rail?.location.name} ${
                  row.terminal_rail?.location.state
                    ? row.terminal_rail?.location.state.code
                      ? row.terminal_rail?.location.state.code
                      : ""
                    : ""
                } ${
                  row.terminal_rail?.location.country
                    ? row.terminal_rail?.location.country.country_code
                    : ""
                }`
              : ""
            : "",
        header: "Location",
        Edit: ({ cell, column, table }) => (
          <TextField
            disabled
            id="outlined-disabled"
            variant="standard"
            color="success"
            value={cell.getValue()}
          />
        ),
      },

      // {
      //   accessorFn: (row) =>
      //     row.location
      //       ? ` ${row.location?.name} (${row.location?.country.country_code}${row.location?.location}) `
      //       : "",
      //   header: "Location",
      //   Edit: ({ cell, column, table }) => (
      //     <AutoComplete cell={cell.row.getAllCells()[1].getValue()} />
      //   ),
      // },
    ],
    []
  );
  const handleDeleteRow = useCallback(
    async (row: MRT_Row<any>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      const res = await fetch(`${proxy}/v2/terminals/names/${row.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res?.status < 300) {
        refetch();
      }
    },
    [refetch]
  );
  const handleSaveRow: MaterialReactTableProps<any>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values, table }) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      //send/receive api updates here
      const res = await fetch(`${proxy}/v2/terminals/addnames`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          { id: row.id, terminal_rail: selected_terminal },
        ]),
      });
      if (res?.status < 300) {
        refetch();
        exitEditingMode(); //required to exit editing mode and close modal
      }
      dispatch(SetSelectedTerminal(null));
    };

  return (
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
        <Tooltip arrow title="Refresh Data">
          <IconButton onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
      rowCount={data?.meta?.total ?? 0}
      state={{
        isLoading,
        pagination,
        showAlertBanner: isError,
        showProgressBars: isFetching,
      }}
    />
  );
};

const queryClient = new QueryClient();

const Terminals_Rails_Name_Components = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default Terminals_Rails_Name_Components;
