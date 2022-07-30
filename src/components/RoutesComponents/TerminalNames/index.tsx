import Router, { useRouter } from "next/router";

import React, {
  FC,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "../../config/theme";
import {
  AddOtherNames,
  getAllTerminals,
  getOtherNames,
  getAllRails,
} from "../../redux/actions/terminalsActions";
import { proxy } from "../../redux/proxy";
import { RootState } from "../../redux/store";
import NewTerminal from "./newTerminal";
import NewTerminalName from "./NewTerminalName";
import Pagination from "./Pagination";

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
  const dispatch = useDispatch();
  const { names, allTerminals, loadingOtherNames, allRails } = useSelector(
    (state: RootState) => state.terminal
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [paramsPerPage] = useState(10);
  const [terminal_id, setTerminal_id] = useState<any>();
  const [railterminal_id, setRailTerminal_id] = useState<any>();

  const [name, setName] = useState<any>();
  const [terminal, setTerminal] = useState<any>();
  const [rail, setRail] = useState<any>();

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
    dispatch(getOtherNames(option));
    dispatch(getAllTerminals());
    dispatch(getAllRails());
  }, [dispatch, option]);

  let currentParams: any[] = [];
  const indexOfLastPost = currentPage * paramsPerPage;
  const indexOfFirstPost = indexOfLastPost - paramsPerPage;

  currentParams = names.slice(indexOfFirstPost, indexOfLastPost);

  console.log("current ", currentParams, indexOfLastPost, indexOfFirstPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const getId = (event: React.FormEvent<HTMLSelectElement>) => {
    setTerminal(event.currentTarget.value);
    const selectedIndex = event.currentTarget.options.selectedIndex;

    setTerminal_id(
      event.currentTarget.options[selectedIndex].getAttribute("data-id")
    );
  };
  const onEdit = ({ id, col, key }: onEditParamCurrent) => {
    setInEditMode({
      status: true,
      rowKey: id,
      colKey: col,
      keyToUpdate: key,
    });
  };
  const removeName = async (id: string) => {
    setLoading(true);
    const res = await fetch(`${proxy}/v2/terminals/names/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status < 300) {
      setLoading(false);
      dispatch(getOtherNames(option));
      refreshData();
    }
  };
  const getOptions = (event: React.FormEvent<HTMLSelectElement>) => {
    dispatch(getOtherNames(event.currentTarget.value));
    setOption(event.currentTarget.value);
  };
  const onSave = async ({ id }: onEditParamNew) => {
    console.log(id, name, terminal_id);
    setLoading(true);
    let res;
    if (inEditMode.keyToUpdate === "name") {
      res = await fetch(`${proxy}/v2/terminals/addnames`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify([{ id, name }]),
      });
    } else {
      const terminal = terminal_id ? { id: terminal_id } : null;
      const rail = railterminal_id ? { id: railterminal_id } : null;

      res = await fetch(`${proxy}/v2/terminals/addnames`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify([{ id, terminal, rail }]),
      });
    }

    if (res.status < 300) {
      setLoading(false);
      dispatch(getOtherNames(option));
      refreshData();
      setInEditMode({
        status: false,
        rowKey: "",
        colKey: "",
        keyToUpdate: "",
      });
      setName("");
      setTerminal_id("");
    }
  };

  const getRailId = (event: React.FormEvent<HTMLSelectElement>) => {
    setRail(event.currentTarget.value);
    const selectedIndex = event.currentTarget.options.selectedIndex;

    setRailTerminal_id(
      event.currentTarget.options[selectedIndex].getAttribute("data-id")
    );
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
  return (
    <div className="container">
      <div className="flex px-1 mb-6 md:mb-0 items-center">
        <div className=" flex relative  w-1/8 my-4  ">
          <select
            className="block  appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-state"
            value={option}
            onChange={getOptions}
          >
            <option value="1">All</option>
            <option value="0">No Terminal</option>
          </select>
        </div>
        <NewTerminal />
        <NewTerminalName option={option} />
        <div className=" ml-3  flex w-1/8 my-4">
          {loadingOtherNames && (
            <svg
              className="animate-spin  h-5 w-5 mr-3 border-t-2 border-b-2 border-black"
              viewBox="0 0 24 24"
            ></svg>
          )}
        </div>
      </div>

      <table className="items-center bg-transparent w-full border-solid border-black border-2">
        <thead>
          <tr className=" border-solid border-black border-2 ">
            <th className=" py-4 px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-black text-xs uppercase  whitespace-nowrap font-semibold text-left">
              SCRAPED NAME
            </th>
            <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-black text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Set Terminal
            </th>
            <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-black text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Set Rail Terminal
            </th>
            <th className=" px-2 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-black text-xs uppercase  whitespace-nowrap font-semibold text-left">
              {loading && (
                <svg
                  className="animate-spin  h-5 w-5 mr-3 border-t-2 border-b-2 border-black"
                  viewBox="0 0 24 24"
                ></svg>
              )}
            </th>
          </tr>
        </thead>

        <tbody>
          {currentParams.map((el: any, index: number) => (
            <tr key={index} className="border-solid border-black border-2">
              <td
                onDoubleClick={() => {
                  el.name ? setName(el.name) : setName("");
                  console.log("thisss", Object.keys(el)[1]);

                  onEdit({
                    id: el.id,
                    col: el.name,
                    key: Object.keys(el)[1],
                  });
                  //  ulRef.current.children[1].children[0];
                }}
                className="border-solid border-2 border-black px-6 align-middle  text-xs whitespace-nowrap p-3 text-left text-blueGray-700 "
              >
                {inEditMode.status &&
                inEditMode.rowKey === el.id &&
                inEditMode.colKey === el.name &&
                inEditMode.keyToUpdate === Object.keys(el)[1] ? (
                  <input
                    className="w-full h-full p-2"
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
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                ) : (
                  <input
                    className="w-full"
                    type="text"
                    value={el.name}
                    style={{ color: Theme.colors.dark }}
                    disabled
                  />
                )}
              </td>
              {/* terminals sections */}
              <td
                onDoubleClick={() => {
                  el.terminal ? setTerminal(el.terminal.name) : setTerminal("");
                  console.log("herrr djo", Object.keys(el)[3]);

                  onEdit({
                    id: el.id,
                    col: el.terminal,
                    key: Object.keys(el)[3],
                  });
                  //  ulRef.current.children[1].children[0];
                }}
                className="border-solid border-2 border-black px-6 align-middle  text-xs whitespace-nowrap p-3 text-left text-blueGray-700 "
              >
                {inEditMode.status &&
                inEditMode.rowKey === el.id &&
                inEditMode.colKey === el.terminal &&
                inEditMode.keyToUpdate === Object.keys(el)[3] ? (
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
                      value={terminal}
                      onChange={getId}
                    >
                      <option>Select Terminal</option>
                      {allTerminals?.map((terminal: any, index: number) => (
                        <option data-id={terminal.id} key={terminal.id}>
                          {terminal.nickname} {" - "} {terminal.frims_code}{" "}
                          {" - "} {terminal.port?.state}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <input
                    className="w-full"
                    type="text"
                    value={
                      el.terminal
                        ? el.terminal?.nickname + " - " + el.terminal.frims_code
                        : ""
                    }
                    style={{ color: Theme.colors.dark }}
                    disabled
                  />
                )}
              </td>
              {/* Rail terminals section  */}
              <td
                onDoubleClick={() => {
                  el.rail ? setRail(el.rail.name) : setRail("");
                  console.log("herrr djo", Object.keys(el)[4]);
                  onEdit({
                    id: el.id,
                    col: el.rail,
                    key: Object.keys(el)[4],
                  });
                  //  ulRef.current.children[1].children[0];
                }}
                className="border-solid border-2 border-black px-6 align-middle  text-xs whitespace-nowrap p-3 text-left text-blueGray-700 "
              >
                {inEditMode.status &&
                inEditMode.rowKey === el.id &&
                inEditMode.colKey === el.rail &&
                inEditMode.keyToUpdate === Object.keys(el)[4] ? (
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
                      value={rail}
                      onChange={getRailId}
                    >
                      <option>Select Rail</option>
                      {allRails?.map((rail: any) => (
                        <option data-id={rail.id} key={rail.id}>
                          {rail.name} {rail.state ? " - " + rail.state : ""}{" "}
                          {" - "} {rail.frims_code}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <input
                    className="w-full"
                    type="text"
                    value={
                      el.rail ? el.rail.frims_code + " " + el.rail?.name : ""
                    }
                    style={{ color: Theme.colors.dark }}
                    disabled
                  />
                )}
              </td>
              <td className="w-1/5 text-center">
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
                    onClick={() => removeName(el.id)}
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container">
        <div className="grid grid-rows-4">
          <Pagination
            postsPerPage={paramsPerPage}
            totalPosts={names.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
