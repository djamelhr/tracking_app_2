/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { Router, useRouter } from "next/router";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewBlNav from "../components/layouts/NewBlNav";
import {
  addShipment,
  addShipmentNotracking,
  SetRequestNumber,
  SetShippingLinesName,
} from "../components/redux/actions/shipmentsActions";
import { ShippingLinesAvailable } from "../components/redux/shipmentsData";
import { RootState } from "../components/redux/store";
import { terminalsAvailable } from "../components/redux/terminalsData";

const newBolContainers = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [terminalname, setTerminalName] = useState<string>("");
  const [shippingName, setShippingName] = useState<string>("");
  const [containers, setContainers] = useState<string>("");
  const [request_number, setRequest_number] = useState<string>("");

  const addTrackingRequest = async (e: React.FormEvent) => {
    console.log("tracking");

    e.preventDefault();
    if (request_number?.length !== 0 && shippingName?.length !== 0) {
      console.log(request_number, shippingName);
      const scac = ShippingLinesAvailable.find(
        ({ name }) => shippingName === name
      )?.scac;
      const frims_code = terminalsAvailable.find(
        ({ name }) => terminalname === name
      )?.firms;
      dispatch(
        addShipmentNotracking({
          request_number,
          scac,
          containers,
          frims_code,
        })
      );
      //  router.push("/tracking_requests");
    } else {
      return alert("check attributes");
    }
  };
  return (
    <div className="h-screen bg-gray-100 ">
      <NewBlNav />
      <form className="w-full max-w-7xl p-5">
        <div className="flex  -mx-3 mb-2">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Bill Of Lading
            </label>
            <div className="relative">
              <input
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                placeholder="Enter BOL"
                onChange={(event) => setRequest_number(event.target.value)}
                value={request_number}
                // onChange={setmake}
                // ref={inputMakes}
              ></input>
            </div>
          </div>
          <div className="w-full   ">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Container
            </label>
            <div className="relative">
              <textarea
                placeholder="Enter one or more Container Numbers , separated by commas."
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                rows={4}
                onChange={(event) => setContainers(event.target.value)}
                value={containers}
              ></textarea>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="w-full   px-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Terminals (optional)
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={terminalname}
                onChange={(event) => setTerminalName(event.target.value)}
              >
                <option>Select Terminal</option>
                {terminalsAvailable?.map((terminal: any, index: number) => (
                  <option key={index}>{terminal.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full   px-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Shipping Line (optional)
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={shippingName}
                onChange={(event) => setShippingName(event.target.value)}
              >
                <option>Select Shipping Line</option>
                {ShippingLinesAvailable?.map(
                  (shipping_line: any, index: number) => (
                    <option key={index}>{shipping_line.name}</option>
                  )
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full   px-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Create Shipment
            </label>
            <div className="relative">
              <button
                className="w-full bg-green-700 border border-gray-200 py-3 px-4 pr-8  text-white font-bold uppercase rounded leading-tight focus:outline-none  focus:border-gray-500"
                onClick={addTrackingRequest}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default newBolContainers;
