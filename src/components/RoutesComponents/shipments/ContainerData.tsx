import React, { useState } from "react";
// import { tracking_requests_at_terminal } from "../redux/actions/shipmentsActions";
// import { terminalsAvailable } from "../redux/terminalsData";

import TableEvent from "./Eventstable";
import HistoryAtTerminal from "./HistoryAtTerminal";
const ContainerData = ({ container, shipmentId }: any) => {
  // console.log(container, "ffff");
  const [isActive, setIsActive] = useState(false);

  return (
    <div className=" accordion min-w-full bg-gray-50 shadow-lg m-2 overflow-hidden p-3">
      <div className="accordion-item  m-2 w-full  bg-white items-center rounded-lg  p-4">
        <div className="flex justify-between accordion-title bg-orange-600 text-base uppercase px-2 py-1 text-black   ">
          <a> {container.number} </a>{" "}
          <div>
            <p>{container.current_status}</p>
            <p className="text-xs">
              {container.current_status === "Picked up"
                ? container.picked_up_at
                : null}
            </p>{" "}
          </div>
          <button
            type="button"
            className="text-xl"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? "-" : "+"}
          </button>
        </div>
      </div>
      {isActive && (
        <div>
          {!container.cntnr ? (
            <div className="flex flex-wrap  mb-2">
              <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                {" "}
                <p className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  No History at terminal
                </p>
              </div>
              {/* <div className="w-full md:w-1/4 px-1 mb-6 md:mb-0">
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    value={frims_code}
                    onChange={(event) => setTerminalFrims(event.target.value)}
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
              </div> */}
            </div>
          ) : (
            <HistoryAtTerminal
              className="accordion-content "
              cntnr={
                container.cntnr === null
                  ? "no History at terminal"
                  : container.cntnr
              }
            />
          )}
          {container.cargo_shipment_events.length === 0 ? (
            <div className="flex flex-wrap  mb-2">
              <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                {" "}
                <p className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  No Shipment Events
                </p>
              </div>
            </div>
          ) : (
            <TableEvent
              className="accordion-content "
              events={container.cargo_shipment_events}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ContainerData;
// {
//   /* <div className="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
// <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
//   {shipment.number}
// </h3>
// <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
//   {shipment.number}
// </p>
// <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
//   {moment(shipment.voyage.last_status_refresh_at).fromNow()}
// </div>
// </div> */
// }
