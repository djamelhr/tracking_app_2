/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShipments } from "../redux/actions/shipmentsActions";
import { getTrackingRequests } from "../redux/actions/trackingRequestsActions";
import { RootState } from "../redux/store";
import TrackingRequestsCard from "./TrackingRequestsCard";

const MainTrakingRequests = () => {
  const dispatch = useDispatch();
  const {
    TrackingRequestsdata,
    trackingRequestsLoading,
    trackingRequestsError,
  } = useSelector((state: RootState) => state.tracking_requests);
  useEffect(() => {
    dispatch(getTrackingRequests());
  }, [dispatch]);

  //console.log(TrackingRequestsdata);
  // if () {
  //   return <div>No Tracking Requests</div>;
  // }  if (loading || !data) {
  //   return <div>lodding...</div>;
  // }
  if (trackingRequestsLoading || !TrackingRequestsdata) {
    return <div>lodding...</div>;
  }
  return (
    <div>
      <div className="  grid grid-rows-1 gap-5 place-items-center">
        <div className="w-4/5   bg-white shadow-lg rounded-lg overflow-hidden ">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
              REQUEST NUMBER
            </div>
            <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
              SCAC
            </div>
            <div className="bg-orange-600 text-xs uppercase px-2 py-1   text-black-200 font-bold">
              STATUS
            </div>
            <div className="text-sm">CREATED</div>
          </div>
        </div>
        {TrackingRequestsdata?.length === 0
          ? "No Tracking Requests"
          : TrackingRequestsdata.map((trackingRequest: any) => (
              <TrackingRequestsCard
                key={trackingRequest.id}
                trackingRequest={trackingRequest}
              />
            ))}
      </div>
    </div>
  );
};

export default MainTrakingRequests;
