import React from "react";
import _ from "lodash";

const Containercard = ({ container }: any) => {
  return (
    <div className=" bg-gray-50 shadow-lg  overflow-hidden p-3">
      <div className="flex justify-between  w-full  bg-white items-center rounded-lg  p-4">
        <div className="bg-orange-600 text-base uppercase px-2 py-1 text-black   ">
          <a> {container.number} </a>
          <p></p>
        </div>
        <div>
          <p className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
            {" "}
            {container.current_status}
          </p>

          <p className="text-xs">
            {container.current_status === "Picked up"
              ? container.picked_up_at
              : null}
          </p>
        </div>
        <div className="bg-orange-600 text-xs  px-2 py-1   text-black-200 font-bold">
          {container.cntnr ? (
            <p>
              {_.orderBy(
                container.cntnr.containers_update,
                ["created_at"],
                ["desc"]
              )[0].last_free_day_on
                ? "LFD: " +
                  _.orderBy(
                    container.cntnr.containers_update,
                    ["created_at"],
                    ["desc"]
                  )[0].last_free_day_on
                : "No LFD"}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="text-sm">
          {container.cntnr
            ? _.orderBy(
                container.cntnr.containers_update,
                ["created_at"],
                ["desc"]
              )[0].holds.map((hold: any) => (
                <p className="text-red-600 font-bold" key={hold.id}>
                  {hold.name}: {hold.status}
                </p>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Containercard;
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
