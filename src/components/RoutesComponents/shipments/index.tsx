/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShipments } from "../../redux/actions/shipmentsActions";
import { Ishipment } from "../../redux/interfaces";
import { RootState } from "../../redux/store";
import Shipmentcard from "./Shipmentcard";

const MainShipments = () => {
  const dispatch = useDispatch();
  const { data, loadingShipments, error } = useSelector(
    (state: RootState) => state.shipments
  );
  useEffect(() => {
    dispatch(getShipments());
  }, [dispatch]);

  const fer = (data: Ishipment[]) => {
    return data.map((shipment: Ishipment) => {
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
      />;
    });
  };

  if (loadingShipments || !data) {
    return <div>lodding...</div>;
  }
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

        {data?.length === 0
          ? "No shipment"
          : data.map((shipment: Ishipment) => (
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
      </div>
    </div>
  );
};

export default MainShipments;
