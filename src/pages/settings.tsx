/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { Router, useRouter } from "next/router";

import React, { useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllShippingLines,
  getShippingLines,
  SaveShippingLine,
  SetShippingLinesName,
  UpdateShippingLine,
} from "../components/redux/actions/shipmentsActions";
import { RootState } from "../components/redux/store";

const Setting = () => {
  const dispatch = useDispatch();
  const { shipping_lines } = useSelector((state: RootState) => state.shipments);

  useEffect(() => {
    dispatch(getAllShippingLines());
  }, [dispatch]);
  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(UpdateShippingLine(event.target.value));
  };
  return (
    <div>
      <div
        style={{
          columnCount: 4,
        }}
        className="list-container"
      >
        {shipping_lines?.map((item) => (
          <div key={item.id} className="items-center m-4">
            <input
              checked={item.is_trackable}
              value={item.id}
              onChange={handleCheck}
              type="checkbox"
              className=" w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className=" ml-2 text-sm font-medium text-gray-900">
              {item.name}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={() => dispatch(SaveShippingLine(shipping_lines))}
        className=" fixed bottom-5 right-5  px-5 py-2 text-lg font-bold tracking-wide text-white bg-green-500 rounded-full focus:outline-none"
      >
        Save
      </button>
    </div>
  );
};
export default Setting;
