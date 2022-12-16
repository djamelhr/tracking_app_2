import React, { useMemo, useState, useEffect, useCallback } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { proxy } from "../redux/proxy";
import AutoComplete from "./Autocomplete";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Delete, Edit } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
const Example = () => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { selected_locations } = useSelector(
    (state: RootState) => state.shipments
  );

  const [tableData, setTableData] = useState<RootObject[]>([]);

  const getdata = async () => {
    const url = new URL(`${proxy}/v1/locations/names`);
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

  interface State {
    id: string;
    name: string;
    code: string;
  }

  interface Country {
    id: string;
    name: string;
    country_code: string;
  }

  interface Location {
    id: string;
    name: string;
    name49?: any;
    time_zone?: any;
    location: string;
    coordinates: string;
    name_diacritics: string;
    function: string;
    date: string;
    state: State;
    country: Country;
  }

  interface ShippingLine {
    id: string;
    scac: string;
    name: string;
    nickname: string;
    tracking_url: string;
    is_trackable: boolean;
    contact_url?: any;
    bol_prefix: string;
    bill_of_lading_tracking_support?: any;
    booking_number_tracking_support?: any;
    container_number_tracking_support?: any;
  }

  interface RootObject {
    id: string;
    name: string;
    created_at: Date;
    location: Location;
    shipping_line: ShippingLine;
  }
  const columns = useMemo<MRT_ColumnDef<RootObject>[]>(
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
          row.location
            ? ` ${row.location?.name} (${row.location?.country.country_code}${row.location?.location}) `
            : "",
        header: "Location",
        Edit: ({ cell, column, table }) => <AutoComplete />,
      },
    ],
    []
  );
  const handleDeleteRow = useCallback(async (row: MRT_Row<RootObject>) => {
    if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
      return;
    }
    //send api delete request here, then refetch or update local table data for re-render
    const res = await fetch(`${proxy}/v1/ports/names/${row.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res?.status < 300) {
      await getdata();
    }
  }, []);
  const handleSaveRow: MaterialReactTableProps<RootObject>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values, table }) => {
      //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
      //send/receive api updates here
      const res = await fetch(`${proxy}/v1/ports/addnames`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          { id: row.id, location: { id: selected_locations } },
        ]),
      });
      if (res?.status < 300) {
        await getdata();
        exitEditingMode(); //required to exit editing mode and close modal
      }
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

const ExampleWithReactQueryProvider = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;
