/* eslint-disable @next/next/link-passhref */
import { debounce } from "lodash";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoreShipments,
  getShipments,
} from "../../redux/actions/shipmentsActions";
import { Ishipment } from "../../redux/interfaces";
import { proxy } from "../../redux/proxy";
import { RootState } from "../../redux/store";
import Shipmentcard from "./Shipmentcard";

const MainShipments = () => {
  const fetchShipments = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `${proxy}/v2/shipments/page_number/${pageParam}/page_size/5`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const content = await res.json();
    return content;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("shipments", fetchShipments, {
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage.meta.pagination.next);
      return lastPage.meta.pagination.next;
    },
  });
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

  return (
    <div>
      <Link href="/new_bl">
        <button className=" fixed bottom-5 right-5  px-5 py-2 text-lg font-bold tracking-wide text-white bg-green-500 rounded-full focus:outline-none">
          Add Shipment
        </button>
      </Link>

      <div className="  grid grid-rows-1 gap-5 place-items-center">
        <div className="w-4/5   bg-white shadow-lg rounded-lg overflow-hidden ">
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
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          <>
            {data.pages.map((group, i) => (
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
