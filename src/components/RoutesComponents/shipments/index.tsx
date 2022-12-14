/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import React, { UIEvent, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Ishipment } from "../../redux/interfaces";
import { proxy } from "../../redux/proxy";
import Shipmentcard from "./Shipmentcard";
import { Box } from "@mui/system";
import { IconButton, TextField } from "@mui/material";
import { set } from "lodash";

const MainShipments = () => {
  // useEffect(() => {
  //   let fetching = false;
  //   const onScroll = async (event) => {
  //     const { scrollHeight, scrollTop, clientHeight } =
  //       event.target.scrollingElement;
  //     if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
  //       fetching = true;
  //       console.log(hasNextPage);

  //       if (hasNextPage) await fetchNextPage();
  //       fetching = false;
  //     }
  //   };
  //   document.addEventListener("scroll", onScroll);
  // }, [fetchNextPage, hasNextPage]);
  const [name, setName] = useState("");
  const fetchShipments = async ({ pageParam = 1 }) => {
    const url = new URL(`${proxy}/v2/shipments`);
    url.searchParams.set("page_number", `${pageParam}`);
    url.searchParams.set("page_size", `${10}`);
    url.searchParams.set("name", `${name}`);
    const response = await fetch(url.href);
    const json = await response.json();
    return json;
  };
  console.log(name);
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    refetch();
  };
  const handleKeyUP = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    refetch();
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
    refetch();
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
    refetch,
  } = useInfiniteQuery("shipments", fetchShipments, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.meta.pagination?.next;
    },
  });
  console.log("status", status, isLoading);
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.1) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);
  console.log(data);

  return (
    <div>
      <Link href="/new_bl">
        <button className="fixed bottom-5 right-5  px-5 py-2 text-lg font-bold tracking-wide text-white bg-green-500 rounded-full focus:outline-none">
          Add Shipment
        </button>
      </Link>

      <div className="  grid grid-rows-1 gap-1 place-items-center">
        <div className="w-4/5    rounded-lg overflow-hidden ">
          <div className="flex justify-between ">
            <Paper
              component="form"
              className=""
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 250,
                marginX: "10px",
                marginY: "10px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="BOL "
                value={name}
                inputProps={{ "aria-label": "search " }}
                onKeyUp={handleKeyUP}
                onKeyDown={handleKeyDown}
                onChange={handleChangeName}
              />
            </Paper>

            <Paper
              component="form"
              className=""
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 250,
                marginX: "10px",
                marginY: "10px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Origin port "
                disabled
                inputProps={{ "aria-label": "search " }}
                onKeyUp={handleKeyUP}
                onKeyDown={handleKeyDown}
                onChange={handleChangeName}
              />
            </Paper>
            <Paper
              component="form"
              className=""
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 250,
                marginX: "10px",
                marginY: "10px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Destination port "
                disabled
                inputProps={{ "aria-label": "search " }}
                onKeyUp={handleKeyUP}
                onKeyDown={handleKeyDown}
                onChange={handleChangeName}
              />
            </Paper>
            <Paper
              component="form"
              className=""
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 250,
                marginX: "10px",
                marginY: "10px",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Arrival Date "
                disabled
                inputProps={{ "aria-label": "search " }}
                onKeyUp={handleKeyUP}
                onKeyDown={handleKeyDown}
                onChange={handleChangeName}
              />
            </Paper>
          </div>
        </div>
        <div className="w-4/5  bg-gray-200 mb-2 shadow-lg rounded-lg overflow-hidden ">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
              Bol
            </div>
            <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
              ORIGIN PORT
            </div>
            <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
              DESTINATION PORT
            </div>
            <div className="text-sm">ARRIVAL</div>
          </div>
        </div>
        <p className="text-sm font-bold">
          {data?.pages[0].meta?.total
            ? data?.pages[0].meta?.total + " Shipments."
            : ""}{" "}
        </p>

        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          <>
            {data?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.map((shipment: Ishipment) => (
                  <Shipmentcard
                    key={shipment.id}
                    containers={shipment.containers}
                    id={shipment.id}
                    number={shipment.number}
                    pod_terminal={shipment.pod_terminal}
                    voyage={shipment.voyage}
                    port_of_lading_name={shipment.port_of_lading_name}
                    port_of_discharge_name={shipment.port_of_discharge_name}
                    destination_name={shipment.destination_name}
                    created_at={shipment.created_at}
                    pod_terminal_name={shipment.pod_terminal_name}
                    shipping_lines={shipment.shipping_lines}
                    updated_at={shipment.updated_at}
                    vessel={shipment.vessel}
                    port_of_discharge={shipment.port_of_discharge}
                    port_of_lading={shipment.port_of_lading}
                    destination={shipment.destination}
                  />
                ))}
              </React.Fragment>
            ))}
            <div>
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load More"
                  : "Nothing more to load"}
              </button>
            </div>
            <div>
              {isFetching && !isFetchingNextPage ? "Fetching..." : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainShipments;
