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
  const {
    error,
    request_number,
    shipping_line_name,
    shipping_lines,
    loadingNewTr,
  } = useSelector((state: RootState) => state.shipments);

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
          request_number: request_number?.trim(),
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
      <div>
        {loadingNewTr && (
          <div className="text-center">
            <div role="status">
              <svg
                className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>

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
