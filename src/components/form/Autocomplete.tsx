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

const AutoComplete = ({ cell }: any) => {
  const dispatch = useDispatch();

  const { selected_locations } = useSelector(
    (state: RootState) => state.shipments
  );
  const [value, setValue] = useState<string>(cell.split(",")[0]);
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
  useEffect(() => {
    setAllowedToFetch(true);
  }, [cell]);
  // const enterFunction = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   e.key === 'Enter' && ::this.handleSelect(e.target.value)
  // };

  return (
    <div className="select  ">
      <Autocomplete
        // selectOnBlur={() => console.log("djo")}

        getItemValue={(item) => item.id}
        items={data ?? []}
        menuStyle={{
          borderRadius: "3px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "2px 0",
          fontSize: "90%",
          position: "fixed",
          zIndex: 1,
          overflow: "auto",
          maxHeight: "35%", // TODO: don't cheat, let it flow to the bottom
        }}
        renderInput={(props) => {
          return (
            <TextField
              inputProps={props}
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
