import Router, { useRouter } from "next/router";

import React, { KeyboardEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "../../config/theme";
import {
  getAllTerminals,
  getAllPorts,
  SetTerminals,
} from "../../redux/actions/terminalsActions";
import { proxy } from "../../redux/proxy";
import { RootState } from "../../redux/store";
import NewMetroArea from "./NewMetroArea";
import Pagination from "./Pagination";
import _ from "lodash";
interface Iditstatus {
  status: boolean;
  rowKey: string;
  colKey?: string;
  keyToUpdate: string;
}
interface onEditParamCurrent {
  id: string;
  col?: any;
  key: string;
}
interface onEditParamNew {
  id: string;
}
const Table = () => {
  let currentParams: any[] = [];

  const dispatch = useDispatch();
  const { allPorts, allTerminals, loadingOtherNamesRail, type } = useSelector(
    (state: RootState) => state.terminal
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [paramsPerPage] = useState(10);
  const [port_id, setPort_id] = useState<any>();
  const [port, setPort] = useState<any>();
  const [terminal, setTerminal] = useState<any>();
  const [search, setSearch] = useState<string>("");

  const [option, setOption] = useState<string>("1");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inEditMode, setInEditMode] = useState<Iditstatus>({
    status: false,
    rowKey: "",
    colKey: "",
    keyToUpdate: "",
  });
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };
  useEffect(() => {
    setIsRefreshing(false);
    dispatch(getAllPorts());
    dispatch(getAllTerminals());
  }, [dispatch, option, type]);

  const indexOfLastPost = currentPage * paramsPerPage;
  const indexOfFirstPost = indexOfLastPost - paramsPerPage;

  currentParams = allTerminals.slice(indexOfFirstPost, indexOfLastPost);

  //console.log('current ', currentParams, indexOfLastPost, indexOfFirstPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const getId = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log("this metro", event.currentTarget.value);
    console.log("params", currentParams);

    setPort_id(event.currentTarget.value);
  };
  const onEdit = ({ id, col, key }: onEditParamCurrent) => {
    setInEditMode({
      status: true,
      rowKey: id,
      colKey: col,
      keyToUpdate: key,
    });
  };
  const Drop = async (id: string) => {
    setLoading(true);
    let res = await fetch(`${proxy}/v2/rails/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify([
        {
          id,
          metro_area: null,
        },
      ]),
    });
    if (res.status < 300) {
      setLoading(false);
      dispatch(getAllTerminals());
      refreshData();
      setInEditMode({
        status: false,
        rowKey: "",
        colKey: "",
        keyToUpdate: "",
      });
    }
  };

  const onSave = async ({ id }: onEditParamNew) => {
    console.log("this the id", id, port_id);
    setLoading(true);
    let res;
    res = await fetch(`${proxy}/v2/rails/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify([
        {
          id: terminal.id,
          port: {
            id: port_id,
          },
        },
      ]),
    });

    if (res.status < 300) {
      setLoading(false);
      dispatch(getAllTerminals());
      refreshData();
      setInEditMode({
        status: false,
        rowKey: "",
        colKey: "",
        keyToUpdate: "",
      });
      // setName("");
      // setRail_id("");
    }
  };
  const onCancel = () => {
    setLoading(false);

    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: "",
      colKey: "",
      keyToUpdate: "",
    });

    // reset the unit price state value
  };
  const filterByfrimsCode = (e: React.ChangeEvent<{ value: string }>) => {
    if (!e.target.value) {
      dispatch(getAllTerminals());
    }
    setSearch(e.target.value);
    const arr = allTerminals.filter(
      ({ frims_code }: any) => frims_code === e.target.value
    );
    dispatch(SetTerminals(arr));
  };
  return (
    <div className="container">
      <div className="flex px-1 mb-6 md:mb-0 items-center ">
        {/* <NewMetroArea /> */}

        <div className=" ml-3  flex w-1/8 my-4">
          <input
            className="shadow appearance-none border rounded-full p-1.5  text-black"
            type="text"
            value={search}
            onChange={filterByfrimsCode}
            placeholder=" Search by frims code"
          />
        </div>
      </div>
      <table className="items-center bg-transparent w-4/5 border-solid border-black border-2">
        <thead>
          <tr className=" border-solid border-black border-2">
            <th className=" py-4 px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-black text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Terminal
            </th>
            <th className=" py-4 px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-black text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Frims code
            </th>
            <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-black text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Port
            </th>

            {/* <th className=" px-2 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-black text-xs uppercase  whitespace-nowrap font-semibold text-left">
              {loading && (
                <svg
                  className="animate-spin  h-5 w-5 mr-3 border-t-2 border-b-2 border-black"
                  viewBox="0 0 24 24"
                ></svg>
              )}
            </th> */}
          </tr>
        </thead>

        <tbody>
          {currentParams.map((el: any, index: number) => (
            <tr key={index} className="border-solid border-black border-2">
              <td className="border-solid border-2 border-black px-6 align-middle  text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                {el.name}
              </td>
              <td className="border-solid border-2 border-black px-6 align-middle  text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                {el.frims_code}
              </td>
              <td
                onDoubleClick={() => {
                  setTerminal(el);
                  el.metro ? setPort(el.metro.name) : setPort("");
                  console.log(Object.keys(el)[2]);
                  onEdit({
                    id: el.id,
                    col: el.metro,
                    key: Object.keys(el)[2],
                  });
                  //  ulRef.current.children[1].children[0];
                }}
                className="border-solid border-2 border-black px-6 align-middle  text-xs whitespace-nowrap p-3 text-left text-blueGray-700 "
              >
                {inEditMode.status &&
                inEditMode.rowKey === el.id &&
                inEditMode.colKey === el.metro &&
                inEditMode.keyToUpdate === Object.keys(el)[2] ? (
                  <div className="select">
                    <select
                      onKeyPress={(e: KeyboardEvent) =>
                        e.key === "Enter"
                          ? onSave({
                              id: el.id,
                            })
                          : console.log(e.key)
                      }
                      onKeyDown={(e) => {
                        e.key === "Escape" ? onCancel() : console.log(e.key);
                      }}
                      onChange={getId}
                    >
                      <option>Select Port</option>

                      {allPorts?.map((port: any) => (
                        <option value={port.id} key={port.id}>
                          {port.name}
                          {" - "} {port.code}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <input
                    className="w-full"
                    type="text"
                    value={el.port ? el.port.name : ""}
                    style={{ color: Theme.colors.dark }}
                    disabled
                  />
                )}
              </td>
              {/* <td className="w-1/5 text-center">
                {inEditMode.status && inEditMode.rowKey === el.id ? (
                  <React.Fragment>
                    <button
                      className={
                        "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      }
                      onClick={() =>
                        onSave({
                          id: el.id,
                        })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={
                        "text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                      }
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    onClick={() => Drop(el.id)}
                    className="text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 my-2"
                  >
                    DROP
                  </button>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container">
        <div className="grid grid-rows-4">
          <Pagination
            postsPerPage={paramsPerPage}
            totalPosts={allTerminals.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
