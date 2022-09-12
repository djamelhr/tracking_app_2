/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { Router, useRouter } from "next/router";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewBlNav from "../components/layouts/NewBlNav";
import {
  addShipment,
  getShippingLines,
  SetRequestNumber,
  SetShippingLinesName,
} from "../components/redux/actions/shipmentsActions";
import { RootState } from "../components/redux/store";

const newShipment = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, request_number, shipping_line_name, shipping_lines } =
    useSelector((state: RootState) => state.shipments);

  useEffect(() => {
    dispatch(getShippingLines());
  }, [dispatch]);
  const addTrackingRequest = async (e: React.FormEvent) => {
    console.log("tracking");

    e.preventDefault();
    if (request_number?.length !== 0 && shipping_line_name?.length !== 0) {
      console.log(request_number, shipping_line_name);
      const scac = shipping_lines.find(
        ({ name }) => shipping_line_name === name
      )?.scac;
      dispatch(
        addShipment({
          request_number,
          scac,
          request_type: "bill_of_lading",
          type: "tracking_request",
          containers: "",
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
      <form className="w-full max-w-4xl p-5">
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
                onChange={(event) =>
                  dispatch(SetRequestNumber(event.target.value))
                }
                value={request_number}
                // onChange={setmake}
                // ref={inputMakes}
              ></input>
            </div>
          </div>
          <div className="w-full   px-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Shipping Line
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={shipping_line_name}
                onChange={(event) =>
                  dispatch(SetShippingLinesName(event.target.value))
                }
              >
                <option>Select Shipping Line</option>
                {shipping_lines?.map((shipping_line: any) => (
                  <option key={shipping_line.id}>{shipping_line.name}</option>
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
export default newShipment;
