import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";
import { useQuery } from "react-query";
import { proxy } from "../redux/proxy";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SetSelectedTerminal } from "../redux/actions/shipmentsActions";

// TODO edit after fix the bug - issue #30249
export default function AutocompleteListTerminal() {
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState<any[]>([]);

  // take the scroll position at the moment
  const [position, setPosition] = useState(0);

  const { allRails } = useSelector((state: RootState) => state.terminal);

  // take the ListboxNode's DOM Node
  // this value is unlikely to change,
  // but it is necessary to specify it in useEffect
  const [listboxNode, setListboxNode] = useState<any>("");

  //dispatch(SetSelectedLocation(val));
  useEffect(() => {
    const items = paginate(allRails, 10, 1);
    setOptions(items);
    setPage(1);
  }, [allRails]);
  const dispatch = useDispatch();

  // change scroll position,
  // if the position's state has been changed
  useEffect(() => {
    // this condition checks if there is a necessary DOM Node
    if (listboxNode !== "") {
      listboxNode.scrollTop = position;
    }
    // it will only work when the position or node changes
  }, [position, listboxNode]);

  const loadMoreResults = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const items = paginate(allRails, 10, nextPage);
    setOptions([...options, ...items]);
  };

  const handleScroll = (event: any) => {
    // const ListboxNode = event.currentTarget;
    // replaced by this
    setListboxNode(event.currentTarget);

    const x = listboxNode.scrollTop + listboxNode.clientHeight;

    // only when checking this condition we change the position
    if (listboxNode.scrollHeight - x <= 1) {
      setPosition(x);
      loadMoreResults();
    }
  };

  return (
    <>
      <MuiAutocomplete
        options={options}
        autoHighlight
        // value={selected_terminal}
        onChange={(event: any, newValue: any | null) => {
          dispatch(SetSelectedTerminal(newValue));
        }}
        loading={true}
        getOptionLabel={(option) => option.name + " " + option.frims_code}
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
            label="Choose a terminal"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
            helperText={`Current page: ${page}`}
          />
        )}
        ListboxProps={{
          onScroll: handleScroll,
        }}
      />
    </>
  );
}

function paginate(array: any, page_size: any, page_number: any) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
