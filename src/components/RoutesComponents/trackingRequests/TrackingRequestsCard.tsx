import React, { useEffect } from "react";

import moment from "moment";
const TrackingRequestsCard = ({ trackingRequest }: any) => {
  return (
    <div className="w-4/5   bg-white shadow-lg rounded-lg overflow-hidden ">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
          {trackingRequest.request_number}
        </div>
        <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
          {trackingRequest.scac}
        </div>
        {trackingRequest.status === "failed" ? (
          <div className=" text-xs uppercase px-2 py-1   text-red-500 font-bold">
            {trackingRequest.failed_reason}
          </div>
        ) : (
          <div className=" text-xs uppercase px-2 py-1   text-green-500 font-bold">
            {trackingRequest.status}
          </div>
        )}

        <div className="text-sm">
          {moment(trackingRequest.created_at).format("MMM DD ,h:mma")}{" "}
        </div>
      </div>
    </div>
  );
};

export default TrackingRequestsCard;
{
  /* <div className="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
<h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
  {shipment.number}
</h3>
<p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
  {shipment.number}
</p>
<div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
  {moment(shipment.voyage.last_status_refresh_at).fromNow()}
</div>
</div> */
}
