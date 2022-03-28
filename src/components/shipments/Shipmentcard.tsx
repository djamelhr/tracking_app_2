import React, { useEffect, useState } from "react";

import moment from "moment";
import Link from "next/link";
import Containercard from "./containerCard";
import { useDispatch } from "react-redux";
import { getShipmentById } from "../redux/actions/shipmentsActions";
const Shipmentcard = ({ shipment }: any) => {
  console.log(shipment, "ffff");
  const dispatch = useDispatch();

  return (
    <div className="w-4/5   bg-white shadow-lg rounded-lg overflow-hidden ">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="bg-orange-600  uppercase px-2 py-1 text-green-500   ">
          <Link key={shipment.id} href={`/shipments/${shipment.id}`}>
            <a
              //  onClick={() => dispatch(getShipmentById(shipment.id))}
              className="font-bold text-lg "
            >
              {" "}
              {shipment.number}
            </a>
          </Link>
          <p className="text-gray-700 lowercase ">
            {shipment.containers?.length}{" "}
            {shipment.containers?.length === 1 ? "container" : "containers"}{" "}
          </p>
          <p className="text-sm text-gray-700">
            {shipment.pod_terminal?.nickname
              ? shipment.pod_terminal?.nickname
              : null}
            /
            <strong className="text-xs">
              {shipment.pod_terminal?.nickname
                ? shipment.pod_terminal?.frims_code
                : null}
            </strong>
          </p>
        </div>
        <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
          {shipment.port_of_lading_name}
        </div>
        <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
          {shipment.port_of_discharge_name}
          <p>{shipment.destination_name ? shipment.destination_name : ""}</p>
        </div>
        {shipment.voyage ? (
          <div className="text-sm">
            {shipment.voyage.pod_eta_at
              ? moment(shipment.voyage.pod_eta_at).format("MMM DD ")
              : "No ETA"}{" "}
            <p>
              {shipment.voyage.destination_eta_at
                ? moment(shipment.voyage.destination_eta_at).format("MMM DD ")
                : ""}
            </p>
          </div>
        ) : (
          <div className="text-sm">
            <p></p>
          </div>
        )}
      </div>
      <div>
        {shipment.containers.map((con: any) => (
          <Containercard key={con.id} container={con} />
        ))}
      </div>
    </div>
  );
};

export default Shipmentcard;
{
  /* <div className="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
<h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
  {shipment.number}
</h3>
<p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
  {shipment.number}
</p>
<div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
  {moment(shipment.voyage.last_status_refresh_at).fromNow()}
</div>
</div> */
}
