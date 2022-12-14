import React, { useState } from "react";

import { proxy } from "../../redux/proxy";

import _ from "lodash";
import { useQuery } from "react-query";

const TerminalTable = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [count, setCount] = useState(0);

  const [numberOfPorts, setNumberOfPorts] = useState(0);

  const fetchLocations = async (pageParam: any) => {
    const res = await fetch(
      `${proxy}/v2/terminals/page_number/${pageParam}/page_size/10`
    );
    const content = await res.json();
    setCount(content.meta.total);
    return content;
  };

  const { isLoading, isError, data, isFetching } = useQuery(
    ["rails", page],
    () => fetchLocations(page),
    {
      keepPreviousData: true,
    }
  );

  const nextPage = () => {
    setNumberOfPorts(page * 10 + data.data.length);
    setPage((old) => old + 1);
    if (page + 1 === count) {
      setHasMore(true);
    }
  };
  const PreviousPage = () => {
    setPage((old) => Math.max(old - 1, 0));
    setHasMore(false);
  };

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
                    frims_code
                  </th>
                  <th className="px-6 py-2 text-lg text-gray-500">city</th>
                  <th className="px-6 py-2 text-lg text-gray-500">state</th>
                  <th className="px-6 py-2 text-lg text-gray-500">country</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {data?.data?.map((location: any) => (
                  <tr key={location.id} className="whitespace-nowrap">
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-900">
                        {location.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">
                        {location.frims_code}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">
                        {location.city}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">
                        {location.state}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">
                        {location.country_code}
                      </div>
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
          disabled={hasMore || count === 0}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null} <p> {count + 1}</p>
      </div>
    </div>
  );
};

export default TerminalTable;
