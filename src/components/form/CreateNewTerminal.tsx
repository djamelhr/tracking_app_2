import React, { FC, useCallback, useMemo, useState } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
} from "material-react-table";
import {
  FormControl,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  InputLabel,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AutocompleteTerminal from "./AutocompleteTerminal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { proxy } from "../redux/proxy";

export const CreateNewTerminal: FC<{
  columns: MRT_ColumnDef<any>[];
  onClose: () => void;
  onSubmit: (values: any) => void;
  open: boolean;
}> = ({ open, columns, onClose, onSubmit }) => {
  const { selected_locations } = useSelector(
    (state: RootState) => state.shipments
  );

  const [type, setType] = React.useState("terminal");
  const [name, setName] = React.useState("");
  const [frims_code, setfrims_code] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  const handleSubmit = async () => {
    //put your validation logic here
    console.log("change ds", selected_locations, name, frims_code, type);

    const res = await fetch(`${proxy}/v2/terminal_rail`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name,
          type,
          frims_code,
          location: selected_locations ? { id: selected_locations } : null,
        },
      ]),
    });
    if (res?.status < 300) {
      onClose();
      console.log("saved!!");

      //required to exit editing mode and close modal
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Terminal</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <TextField
              key="Name"
              label="Name"
              name="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              key="frims code"
              label="Frims code"
              name="Frims code"
              onChange={(e) => setfrims_code(e.target.value)}
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={type}
                onChange={handleChange}
                label="Type"
              >
                <MenuItem value={"terminal"}>Terminal</MenuItem>
                <MenuItem value={"rail"}>Rail</MenuItem>
              </Select>
            </FormControl>
            <AutocompleteTerminal />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Terminal
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age: number) => age >= 18 && age <= 50;

export default CreateNewTerminal;
