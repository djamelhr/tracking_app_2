import React, { useEffect, useState } from "react";
import moment from "moment";

import Link from "next/link";
import Containercard from "./containerCard";
import { Ishipment } from "../redux/interfaces";

const Shipmentcard = ({
  containers,
  id,
  number,
  pod_terminal,
  voyage,
  port_of_lading_name,
  port_of_discharge_name,
  destination_name,
  created_at,
  pod_terminal_name,
  shipping_lines,
  updated_at,
  vessel,
}: Ishipment) => {
  return (
    <div className="w-4/5   bg-white shadow-lg rounded-lg overflow-hidden ">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="bg-orange-600  uppercase px-2 py-1 text-green-500   ">
          <Link key={id} href={`/shipments/${id}`}>
            <a
              //  onClick={() => dispatch(getShipmentById(shipment.id))}
              className="font-bold text-lg "
            >
              {number}
            </a>
          </Link>
          <p className="text-gray-700 lowercase ">
            {containers?.length}{" "}
            {containers?.length === 1 ? "container" : "containers"}{" "}
          </p>
          <p className="text-sm text-gray-700">
            {pod_terminal?.nickname ? pod_terminal?.nickname : null}/
            <strong className="text-xs">
              {pod_terminal?.nickname ? pod_terminal?.frims_code : null}
            </strong>
          </p>
        </div>
        <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
          {port_of_lading_name}
        </div>
        <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
          {port_of_discharge_name}
          <p>{destination_name ? destination_name : ""}</p>
        </div>

        {voyage ? (
          <div className="text-sm">
            {voyage.pod_eta_at
              ? moment(voyage.pod_eta_at).format("MMM DD ")
              : "No ETA"}{" "}
            <p>
              {voyage.destination_eta_at
                ? moment(voyage.destination_eta_at).format("MMM DD ")
                : ""}
            </p>
          </div>
        ) : null}
      </div>
      <div>
        {containers?.map((con: any) => (
          <Containercard key={con.id} container={con} />
        ))}
      </div>
    </div>
  );
};

export default Shipmentcard;
