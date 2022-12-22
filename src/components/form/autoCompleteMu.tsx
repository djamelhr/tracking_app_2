import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SetSelectedTerminal } from "../redux/actions/shipmentsActions";

export default function CountrySelect() {
  const dispatch = useDispatch();
  const { allRails } = useSelector((state: RootState) => state.terminal);

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={allRails}
      autoHighlight
      onChange={(event: any, newValue: any | null) => {
        dispatch(SetSelectedTerminal(newValue));
      }}
      getOptionLabel={(option: any) => option.name + " " + option.frims_code}
      renderOption={(props, option) => (
        <Box
          key={option.id}
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          {option.name} ({option.frims_code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Terminal"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
