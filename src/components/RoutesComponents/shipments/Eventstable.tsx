import React, { FC } from "react";
import _ from "lodash";
import moment from "moment";

const TableEvent = ({ events }: any) => {
  // console.log(" TableHigh ", events);
  events = _.orderBy(events, ["actual_at", "estimated_at"], ["desc", "desc"]);
  return (
    <table className="items-center bg-transparent m-4 w-2/4 border-solid border-gray-300 border-1">
      <thead>
        <tr className=" border-solid border-gray-300 border-2">
          <th className=" py-4 px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
            Milestone
          </th>
          <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
            Location
          </th>
          <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
            Vessel/Voyage
          </th>
          <th className=" px-6 bg-blueGray-50 text-blueGray-500 align-middle  border-solid border-blueGraborder-solid border-2 border-gray-300 text-xs uppercase  whitespace-nowrap font-semibold text-left">
            Date
          </th>
        </tr>
      </thead>

      <tbody>
        {events?.map((el: any, index: number) => (
          <tr
            key={index}
            style={el.actual_at ? { color: "black" } : { opacity: 0.6 }}
            className="border-solid border-gray-300 border-2"
          >
            <th className="border-solid border-2 border-gray-300 px-6 align-middle  text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
              {el.event ? el.event : el.original_event}
            </th>
            <td className="border-solid border-2 border-gray-300 px-6 align-middle  text-xs whitespace-nowrap p-3 ">
              {el.location_event
                ? el.location_event.name +
                  " " +
                  el.location_event.country?.country_code
                : el.scraper_location + "*"}
            </td>
            <td className="border-solid border-2 border-gray-300 px-6 align-center  text-xs whitespace-nowrap p-3">
              {el.voyage_num ? el.voyage_num : ""}
            </td>
            <td className="border-solid border-2 border-gray-300 px-6 align-center  text-xs whitespace-nowrap p-3">
              {el.actual_at
                ? moment.parseZone(el.actual_at).format("MMM DD h:mm")
                : moment.parseZone(el.estimated_at).format("MMM DD h:mm")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableEvent;
