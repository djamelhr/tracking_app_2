/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContainer,
  SetTerminalName,
  SetTerminalFirms,
  SetBol,
  SetContainerNumber,
} from "../redux/actions/terminalsActions";
import { RootState } from "../redux/store";
import { terminalsAvailable } from "../redux/terminalsData";
const myLoader = ({ src, width, height }: any) => {
  return `https://res.cloudinary.com/superbass/image/upload/b_rgb:2be513,c_scale,h_${height},w_${width}${src}`;
};
const Form = () => {
  const dispatch = useDispatch();
  const {
    data,
    terminal_frims,
    terminal_name,
    terminal_description,
    bol,
    contianer_number,
    loading,
  } = useSelector((state: RootState) => state.terminal);

  const getContainerData = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      getContainer({
        type: "terminal",
        attributes: {
          firms_code: terminal_frims,
          bol,
          request_type: "container",
          request_number: contianer_number,
        },
      })
    );
    console.log("hello");
  };
  console.log(loading);

  return (
    <div>
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              terminal
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                onChange={(event) =>
                  dispatch(SetTerminalName(event.target.value))
                }
                value={terminal_name}
                // onChange={setmake}
                // ref={inputMakes}
              >
                <option>Select Terminal</option>
                {terminalsAvailable?.map((terminal: any) => (
                  <option key={terminal.firms}>{terminal.name}</option>
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
          <div className="w-full md:w-1/4 px-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Firms
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={terminal_frims}
                onChange={(event) =>
                  dispatch(SetTerminalFirms(event.target.value))
                }
              >
                <option>Firms</option>
                {terminalsAvailable?.map((terminal: any, index: number) => (
                  <option key={index}>{terminal.firms}</option>
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

          <div className="w-full px-3 mt-2">
            <div className="relative">
              <p className="ml-2 text-green-700 uppercase font-bold">
                {" "}
                {terminal_description}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 mt-6 md:mb-0">
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
                onChange={(event) =>
                  dispatch(SetContainerNumber(event.target.value))
                }
                value={contianer_number}
              ></textarea>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-1 mb-6 mt-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              BOL
            </label>
            <div className="relative">
              <textarea
                placeholder="Enter one or more Bills of Lading, separated by commas."
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                rows={4}
                value={bol}
                onChange={(event) => dispatch(SetBol(event.target.value))}
              ></textarea>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>
        {/* submit button */}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <div className="relative">
              <button
                type="submit"
                className="block appearance-none w-full bg-green-700 border border-gray-200 text-white font-bold uppercase  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-teal-200 focus:border-gray-500"
                onClick={getContainerData}
              >
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  {loading && (
                    <svg
                      className="animate-spin  h-5 w-5 mr-3 border-t-2 border-b-2 border-black"
                      viewBox="0 0 24 24"
                    ></svg>
                  )}
                </div>
                Go
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
