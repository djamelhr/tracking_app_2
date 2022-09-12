import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

import { proxy } from "../../redux/proxy";

import _ from "lodash";
import { useQuery } from "react-query";
import { countMetros, countPorts } from "../../redux/actions/terminalsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Table = () => {
  const { MetroNumber } = useSelector((state: RootState) => state.terminal);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [numberOfPorts, setNumberOfPorts] = useState(0);

  const fetchMetro = async (page: number) => {
    const res = await fetch(
      `${proxy}/v1/ports/metro_area/page/${page}/per_page/10`
    );
    const content = await res.json();
    console.log(content, "metrroo");

    return content;
  };

  const { isLoading, isError, data, isFetching } = useQuery(
    ["ports", page],
    () => fetchMetro(page),
    {
      keepPreviousData: true,
    }
  );

  const nextPage = () => {
    setNumberOfPorts(page * 10 + data.length);
    setPage((old) => old + 1);
    if (page + 1 === MetroNumber) {
      setHasMore(true);
    }
  };
  const PreviousPage = () => {
    setPage((old) => Math.max(old - 1, 0));
    setHasMore(false);
  };
  useEffect(() => {
    dispatch(countMetros());
  }, [dispatch]);

  //console.log('current ', currentParams, indexOfLastPost, indexOfFirstPost);

  // Change page

  return (
    <div>
      <div className="flex  p-4  ">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          <div>
            <table className="">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-lg text-gray-500">Name</th>
                  <th className="px-6 py-2 text-lg text-gray-500">
                    Contry Code
                  </th>
                  <th className="px-6 py-2 text-lg text-gray-500"> Locode</th>
                  <th className="px-6 py-2 text-lg text-gray-500">City</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {data.map((port: any) => (
                  <tr key={port.id} className="whitespace-nowrap">
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-900">{port.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">
                        {port.country_code}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">{port.code}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="flex p-4">
        <button
          onClick={PreviousPage}
          disabled={page === 0}
          className=" bg-green-700 border border-gray-200 py-1 px-2  text-white font-bold uppercase rounded leading-tight focus:outline-none  focus:border-gray-500"
        >
          Previous Page
        </button>{" "}
        <span className="m-1 text-gray-500">Current Page: {page + 1}</span>
        <button
          onClick={nextPage}
          className=" bg-green-700 border border-gray-200 py-1 px-4   text-white font-bold uppercase rounded leading-tight focus:outline-none  focus:border-gray-500"
          // Disable the Next Page button until we know a next page is available
          disabled={hasMore || MetroNumber === 0}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}{" "}
      </div>
    </div>
  );
};

export default Table;
