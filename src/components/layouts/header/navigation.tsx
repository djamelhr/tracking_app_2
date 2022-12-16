import React from "react";
import Toggle from "../../toggle";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";

const Navigation = () => {
  const handleSingOut = (e: any) => {
    e.preventDefault();

    signOut({
      callbackUrl: "/auth/signin",
      redirect: true,
    });
  };
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
        <div className="py-2 border-b-2 border-opacity-10 border-gray-100	lg:border-0">
          <Link href="/locations_names">
            <a className="dark:text-skin-white">Data</a>
          </Link>
        </div>
        <div className="py-2 border-b-2 border-opacity-10 border-gray-100	lg:border-0">
          <Link href="/settings">
            <a className="dark:text-skin-white">Settings</a>
          </Link>
        </div>

        <div className="place-self-center py-2 border-b-2 border-opacity-10 border-gray-100 border-gray-100 lg:border-0">
          <Toggle />
        </div>
        <div className=" border-b-2 border-opacity-10 border-gray-100	lg:border-0">
          <IconButton className="dark:text-skin-white" onClick={handleSingOut}>
            <LogoutIcon></LogoutIcon>
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Navigation;
