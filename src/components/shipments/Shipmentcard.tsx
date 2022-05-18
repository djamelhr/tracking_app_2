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
  port_of_discharge,
  port_of_lading,
  destination,
}: Ishipment) => {
  const diffEta = (eta: string, orginalEta: string) => {
    const diff = Math.floor(
      moment.duration(moment(eta).diff(moment(orginalEta))).asDays()
    );

    return diff === 0 ? "" : "(" + diff + "d)";
  };

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
            {pod_terminal
              ? pod_terminal.nickname + " " + pod_terminal.frims_code
              : null}
          </p>
        </div>
        <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
          {port_of_lading
            ? port_of_lading.name + "," + port_of_lading?.country_code
            : "-"}
        </div>
        <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
          {port_of_discharge
            ? port_of_discharge.name +
              "," +
              (port_of_discharge.state
                ? port_of_discharge.state
                : port_of_discharge.country_code)
            : "-"}
          <p>
            {destination
              ? destination?.metro_area
                ? destination?.metro_area?.name +
                  "," +
                  destination?.metro_area?.state
                : "" && destination?.port
                ? destination?.port +
                  "," +
                  destination?.metro_area?.country_code
                : ""
              : destination_name}
          </p>
        </div>

        {voyage ? (
          <div className="text-sm">
            {voyage.pod_ata_at ? (
              moment(voyage.pod_ata_at).format("MMM DD ")
            ) : voyage.pod_eta_at ? (
              <div>
                {moment(voyage.pod_eta_at).format("MMM DD ")}

                <span className="text-yellow-600">
                  {diffEta(
                    voyage.pod_eta_at,
                    voyage.pod_original_eta_at ? voyage.pod_original_eta_at : ""
                  )}
                </span>
              </div>
            ) : (
              "No ETA"
            )}

            <div>
              {voyage.destination_ata_at ? (
                voyage.destination_ata_at
              ) : voyage.destination_eta_at ? (
                <div>
                  {moment(voyage.destination_eta_at).format("MMM DD ")}{" "}
                  <span className="text-yellow-600">
                    {diffEta(
                      voyage.destination_eta_at,
                      voyage.destination_original_eta_at
                        ? voyage.destination_original_eta_at
                        : ""
                    )}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
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
