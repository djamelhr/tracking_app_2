import React from "react";
import Link from "next/link";

const NewBlNav = () => {
  return (
    <>
      {/* <div className="ml-10 flex items-baseline space-x-4 gap-4"> */}
      <ul className="flex border-b">
        <li className="-mb-px mr-1">
          <Link href="/new_bl">
            <a
              className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold"
              href="#"
            >
              New Shipment
            </a>
          </Link>
        </li>
        <li className="mr-1">
          <Link href="/new_bl_cntnrs">
            <a
              className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
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
