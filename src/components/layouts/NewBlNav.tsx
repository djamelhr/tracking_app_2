import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const NewBlNav = () => {
  const { asPath, pathname } = useRouter();
  return (
    <>
      {/* <div className="ml-10 flex items-baseline space-x-4 gap-4"> */}
      <ul className="flex border-b">
        <li className="-mb-px ">
          <Link href="/new_bl">
            <a
              className={`bg-white inline-block  rounded-t py-2  px-4 font-semibold ${
                pathname === "/new_bl"
                  ? "text-black bg-gray-300"
                  : "text-blue-700"
              }`}
              href="#"
            >
              New Shipment
            </a>
          </Link>
        </li>
        <li className="">
          <Link href="/new_bl_cntnrs">
            <a
              className={`bg-white inline-block  rounded-t py-2 px-4   font-semibold ${
                pathname === "/new_bl_cntnrs"
                  ? "text-black bg-gray-300"
                  : "text-blue-700"
              }`}
              href="#"
            >
              New Shipment (Only terminal)
            </a>
          </Link>
        </li>
      </ul>
      {/* <div className="md:block lg:flex lg:gap-8 ">
        <div className="py-2 border-b-2 border-opacity-10 border-gray-100	lg:border-0">
          <Link href="/">
            <a className="dark:text-skin-white">Terminals</a>
          </Link>
        </div>
       
      </div> */}
    </>
  );
};

export default NewBlNav;
