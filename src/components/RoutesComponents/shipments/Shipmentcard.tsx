import React, { useEffect, useState } from "react";
import moment from "moment";

import Link from "next/link";
import Containercard from "./containerCard";
import { Ishipment } from "../../redux/interfaces";

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
  // const diffEta = (eta: string, orginalEta: string) => {
  //   const diff = Math.floor(
  //     moment.duration(moment(eta).diff(moment(orginalEta))).asDays()
  //   );

  //   return diff === 0 ? "" : "(" + diff + "d)";
  // };
  const destination1 = () => {
    console.log(destination);

    if (destination) {
      let statecode = destination?.state?.code
        ? destination?.state?.code + ","
        : destination_name;

      return (
        <p>
          {destination?.name +
            "," +
            statecode +
            destination?.country?.country_code}
        </p>
      );
    } else {
      return <p>{destination_name ? destination_name + " *" : ""} </p>;
    }
  };

  return (
    <div className="w-4/5   bg-white shadow-lg rounded-lg overflow-hidden ">
      <p className="mt-2 ml-2 text-xs">
        {" "}
        {voyage ? moment(voyage.last_status_refresh_at).fromNow() : ""}
      </p>
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
            ? port_of_lading.name + "," + port_of_lading?.country?.country_code
            : port_of_lading_name + " *"}
          <div className="text-xs text-gray-700 font-normal ">
            {voyage?.pol_atd_at ? (
              moment(voyage?.pol_atd_at).format("MMM DD ")
            ) : voyage?.pol_etd_at ? (
              <div>{moment(voyage?.pol_etd_at).format("MMM DD ")}</div>
            ) : (
              "No ETA"
            )}
          </div>
        </div>

        <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
          {port_of_discharge
            ? port_of_discharge.name +
              "," +
              (port_of_discharge.state
                ? port_of_discharge.state
                : port_of_discharge.country?.country_code)
            : port_of_discharge_name + " *"}
          <p>{destination1()}</p>
        </div>

        {voyage ? (
          <div className="text-sm">
            {voyage.pod_ata_at ? (
              moment(voyage.pod_ata_at).format("MMM DD ")
            ) : voyage.pod_eta_at ? (
              <div>
                {moment(voyage.pod_eta_at).format("MMM DD ")}

                <span className="text-yellow-600">
                  {/* {diffEta(
                    voyage.pod_eta_at,
                    voyage.pod_original_eta_at ? voyage.pod_original_eta_at : ""
                  )} */}
                </span>
              </div>
            ) : (
              "No ETA"
            )}

            <div>
              {voyage.destination_ata_at ? (
                moment(voyage.destination_ata_at).format("MMM DD ")
              ) : voyage.destination_eta_at ? (
                <div>
                  {moment(voyage.destination_eta_at).format("MMM DD ")}{" "}
                  <span className="text-yellow-600">
                    {/* {diffEta(
                      voyage.destination_eta_at,
                      voyage.destination_original_eta_at
                        ? voyage.destination_original_eta_at
                        : ""
                    )} */}
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
