import React, {
  KeyboardEvent,
  useEffect,
  useState,
  ChangeEvent,
  useRef,
} from "react";
import Autocomplete from "react-autocomplete";
import { findLocations } from "../redux/proxy";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SetSelectedLocation } from "../redux/actions/shipmentsActions";
import { RootState } from "../redux/store";

const AutoComplete = () => {
  const dispatch = useDispatch();

  const { selected_locations } = useSelector(
    (state: RootState) => state.shipments
  );
  const [value, setValue] = useState<any>();
  const [allowedToFetch, setAllowedToFetch] = useState(true);
  const [location_id, setlocation_id] = useState<any>();

  const { isLoading, isError, data, isFetching } = useQuery(
    ["locations", value],
    () => findLocations(value),
    {
      keepPreviousData: true,
      enabled: allowedToFetch,
    }
  );
  const OnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setAllowedToFetch(true);
  };
  const onSelectLocation = (val: any) => {
    console.log("this the value.......", val);
    dispatch(SetSelectedLocation(val));
    setlocation_id(val);
    const obj = data.find(({ id }: any) => id.toLowerCase() === val);

    setValue(
      obj.name +
        " " +
        obj.country?.country_code +
        obj.location +
        " " +
        obj.state?.code
    );
    setAllowedToFetch(false);
  };
  console.log(selected_locations);

  return (
    <div className="select  ">
      <Autocomplete
        getItemValue={(item) => item.id}
        items={data ?? []}
        renderInput={(props: any) => {
          return (
            <TextField
              {...props}
              id="my-component"
              label="Start typing"
              margin="normal"
              variant="standard"
              fullWidth
            />
          );
        }}
        onChange={OnChangeValue}
        onSelect={onSelectLocation}
        value={value}
        renderItem={(item, isHighlighted) => (
          <div
            key={item.id}
            style={{
              background: isHighlighted ? "lightgray" : "white",
            }}
          >
            {item.name +
              " " +
              item.country?.country_code +
              item.location +
              " " +
              item.state?.code}
          </div>
        )}
      />
    </div>
  );
};

export default AutoComplete;
