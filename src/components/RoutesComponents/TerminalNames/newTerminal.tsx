import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRails,
  getAllMetro,
  getAllTerminals,
  getAllPorts,
} from "../../redux/actions/terminalsActions";
import { proxy } from "../../redux/proxy";
import { RootState } from "../../redux/store";

const NewTerminal = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState<string>("");
  const [country_code, setCountry_code] = useState<string>("");
  const [frims_code, setFrims_code] = useState<string>("");
  const [portId, setPortId] = useState<string>("");

  const [isRefreshing, setIsRefreshing] = useState(false);

  const { allPorts, allTerminals, type } = useSelector(
    (state: RootState) => state.terminal
  );
  const router = useRouter();

  useEffect(() => {
    setIsRefreshing(false);
  }, [dispatch, type]);
  const refreshData = () => {
    console.log(router.asPath);
    router.replace(router.asPath);
    setIsRefreshing(true);
  };
  const addTerminal = async () => {
    const res = await fetch(`${proxy}/v2/terminals/addterminal/`, {
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
          port: {
            id: portId,
          },
        },
      ]),
    });
    if (res.status < 300) {
      setShowModal(false);
      dispatch(getAllRails());
      dispatch(getAllPorts());
      dispatch(getAllTerminals());
      refreshData();
    }
    setFrims_code("");
    setName("");
    setCountry_code("");
  };

  return (
    <>
      <button
        className="ml-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3 py-2 mr-2 h-10 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New Terminal
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
                      Port
                    </label>
                    <div className="relative">
                      <select
                        onChange={(event) => setPortId(event.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      >
                        <option>Select Port</option>
                        {allPorts?.map((port: any, index: number) => (
                          <option value={port.id} key={port.id}>
                            {port.name} {port.code}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
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

export default NewTerminal;
