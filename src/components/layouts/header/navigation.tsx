import React from "react";
import Toggle from "../../toggle";
import GithubIcon from "../../icons/github";
import Link from "next/link";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Notification from "./Notification";

const Navigation = () => {
  return (
    <>
      {/* <div className="ml-10 flex items-baseline space-x-4 gap-4"> */}

      <div className="md:block lg:flex lg:gap-8 ">
        <div className="py-2 border-b-2 border-opacity-10 border-gray-100	lg:border-0">
          <Link href="/">
            <a className="dark:text-skin-white">Terminals</a>
          </Link>
        </div>
        <div className="py-2 border-b-2 border-opacity-10 border-gray-100	lg:border-0">
          <Link href="/shipments">
            <a className="dark:text-skin-white">Shipments</a>
          </Link>
        </div>
        <div className="py-2 border-b-2 border-opacity-10 border-gray-100	lg:border-0">
          <Link href="/tracking_requests">
            <a className="dark:text-skin-white">Tracking Requests</a>
          </Link>
        </div>
        <div className="place-self-center py-2 border-gray-100 lg:border-0">
          <Toggle />
        </div>
      </div>
    </>
  );
};

export default Navigation;
