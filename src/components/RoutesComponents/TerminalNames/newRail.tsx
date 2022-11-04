import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRails,
  getAllTerminals,
} from "../../redux/actions/terminalsActions";
import { findLocations, proxy } from "../../redux/proxy";
import { RootState } from "../../redux/store";
import Autocomplete from "react-autocomplete";
import { QueryClient, useQuery } from "react-query";

const NewRail = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState<string>("");
  const [country_code, setCountry_code] = useState<string>("");
  const [frims_code, setFrims_code] = useState<string>("");
  const [locationId, setlocationId] = useState<string>("");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [value, setValue] = useState<any>();
  const [allowedToFetch, setAllowedToFetch] = useState(true);

  const { type } = useSelector((state: RootState) => state.terminal);
  const router = useRouter();

  useEffect(() => {
    setIsRefreshing(false);
  }, [dispatch, type]);
  const refreshData = () => {
    console.log(router.asPath);
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  const queryClient = new QueryClient();
  const { isLoading, isError, data, isFetching } = useQuery(
    ["locations", value],
    () => findLocations(value),
    {
      keepPreviousData: true,
      enabled: allowedToFetch,
    }
  );

  const addTerminal = async () => {
    const res = await fetch(`${proxy}/v2/rails/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify([
        {
          name,
          frims_code,
          country_code,
          location: {
            id: locationId,
          },
        },
      ]),
    });
    if (res.status < 300) {
      setShowModal(false);
      dispatch(getAllRails());
      dispatch(getAllTerminals());
      refreshData();
    }
    setFrims_code("");
    setName("");
    setCountry_code("");
  };
  const OnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setAllowedToFetch(true);
  };
  const onSelectLocation = (val: any) => {
    setlocationId(val);
    data.find((item: any) =>
      setValue(
        item.name + " " + item.state?.code + " " + item.country?.country_code
      )
    );
    setAllowedToFetch(false);
  };
  return (
    <>
      <button
        className="ml-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3 py-2 mr-2 h-10 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New Rail
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 mx-auto max-w-6xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">General Info</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Name
                    </label>
                    <input
                      onChange={(event) => setName(event.target.value)}
                      value={name}
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      frims_code
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      type="text"
                      value={frims_code}
                      onChange={(event) => setFrims_code(event.target.value)}
                    />{" "}
                    <label className="block text-black text-sm font-bold mb-1">
                      nickname
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      type="text"
                      value={country_code}
                      onChange={(event) => setCountry_code(event.target.value)}
                    />{" "}
                    <label className="block text-black text-sm font-bold mb-1">
                      Location
                    </label>
                    <Autocomplete
                      wrapperStyle={{ display: "block" }}
                      getItemValue={(item) => item.id}
                      items={data}
                      inputProps={{
                        className:
                          "shadow appearance-none border rounded w-full py-2 px-1 text-black",
                      }}
                      renderItem={(item, isHighlighted) => (
                        <div
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
                      value={value}
                      onChange={OnChangeValue}
                      onSelect={onSelectLocation}
                    />
                    <div className="flex px-1 mb-6 md:mb-0 "></div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={addTerminal}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NewRail;
