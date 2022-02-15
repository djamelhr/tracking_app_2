/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShipments } from "../redux/actions/shipmentsActions";
import { RootState } from "../redux/store";
import Shipmentcard from "./Shipmentcard";

const MainShipments = () => {
  const dispatch = useDispatch();
  const { data, loadingShipments, error } = useSelector(
    (state: RootState) => state.shipments
  );
  useEffect(() => {
    dispatch(getShipments());
  }, [dispatch]);

  const fer = (data: any) => {
    return data.map((shipment: any) => {
      <Shipmentcard shipment={shipment} />;
    });
  };

  if (loadingShipments || !data) {
    return <div>lodding...</div>;
  }
  return (
    <div>
      <Link href="/new_bl">
        <button className=" absolute bottom-5 right-5  px-5 py-2 text-lg font-bold tracking-wide text-white bg-green-500 rounded-full focus:outline-none">
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
          : data.map((shipment: any) => (
              <Shipmentcard key={shipment.id} shipment={shipment} />
            ))}
      </div>
    </div>
  );
};

export default MainShipments;
