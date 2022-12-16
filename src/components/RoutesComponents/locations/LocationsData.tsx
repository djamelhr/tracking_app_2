import React, { useState } from "react";

import { proxy } from "../../redux/proxy";

import _ from "lodash";
import { useQuery } from "react-query";

const LocationsTable = () => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [count, setCount] = useState(0);
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");

  const [numberOfPorts, setNumberOfPorts] = useState(0);

  const fetchLocations = async (data: any) => {
    const res = await fetch(
      `${proxy}/v1/locations/country_code/${
        data.country ? data.country : "null"
      }/name/${data.name ? data.name : "null"}/page/${data.page}/per_page/10`
    );
    const content = await res.json();
    setCount(content.count);
    return content;
  };

  const { isLoading, isError, data, isFetching } = useQuery(
    ["locations", { page, country, name }],
    () => fetchLocations({ page, country, name }),
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
  console.log(data);

  return (
    <div>
      <div className="flex  p-4  ">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          <div>
            <div className=" flex relative  w-1/8 my-4  ">
              <input
                className="block  appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={country}
                placeholder="US"
                onChange={(event) => setCountry(event.currentTarget.value)}
              ></input>
            </div>
            <div className=" flex relative  w-1/8 my-4  ">
              <input
                className="block  appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                placeholder="New York"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
              ></input>
            </div>
            <table className="">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-2 text-lg text-gray-500">Name</th>
                  <th className="px-6 py-2 text-lg text-gray-500">
                    Contry_Code
                  </th>
                  <th className="px-6 py-2 text-lg text-gray-500">Code</th>
                  <th className="px-6 py-2 text-lg text-gray-500">
                    State Code
                  </th>
                  <th className="px-6 py-2 text-lg text-gray-500">
                    Coordinates
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {data?.data?.map((location: any) => (
                  <tr key={location.id} className="whitespace-nowrap">
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-900">
                        {location.name_diacritics}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">
                        {location.country?.country_code}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">
                        {location?.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">
                        {location.state?.code}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-base text-gray-500">
                        {location.coordinates}
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

export default LocationsTable;
