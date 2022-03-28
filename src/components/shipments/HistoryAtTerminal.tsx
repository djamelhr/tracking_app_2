import React, { FC } from "react";
import _ from "lodash";
import moment from "moment";

const HistoryAtTerminal = ({ cntnr }: any) => {
  let events = cntnr.containers_update;
  console.log(" TableHigh ");
  events = _.orderBy(events, ["created_at"], ["desc"]);
  return (
    <>
      <p> last refresh at Terminal {moment(cntnr.last_refresh).fromNow()}</p>
      <table className="items-center bg-transparent m-4 w-2/4 border-solid border-gray-300 border-1">
        <thead>
          <tr className=" border-solid border-gray-300 border-2">
            <th className=" py-4 px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Status
            </th>
            <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Holds
            </th>
            <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Fees
            </th>
            <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
              LFD
            </th>
            <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Location
            </th>
            <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {events?.map((el: any) => (
            <tr key={el.id} className="border-solid border-gray-300 border-2">
              <th className="border-solid border-2 border-gray-300 px-6 align-middle  text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                {el.status}
              </th>
              <td className="border-solid border-2 border-gray-300 px-6 align-middle  text-xs whitespace-nowrap p-3 ">
                {el.holds.length === 0
                  ? ""
                  : el.holds.map((hold: any) => (
                      <p className="text-red-600 font-bold" key={hold.id}>
                        {hold.name}: {hold.status}
                      </p>
                    ))}
              </td>
              <td className="border-solid border-2 border-gray-300 px-6 align-center  text-xs whitespace-nowrap p-3">
                {""}
              </td>
              <td className="border-solid border-2 border-gray-300 px-6 align-center  text-xs whitespace-nowrap p-3">
                {el.last_free_day_on}
              </td>
              <td className="border-solid border-2 border-gray-300 px-6 align-center  text-xs whitespace-nowrap p-3">
                {el.location}
              </td>
              <td className="border-solid border-2 border-gray-300 px-6 align-center  text-xs whitespace-nowrap p-3">
                {el.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HistoryAtTerminal;
