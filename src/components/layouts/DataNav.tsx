import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DataNav = () => {
  const { asPath, pathname } = useRouter();
  console.log(pathname, "aspath", asPath);

  return (
    <>
      {/* <div className="ml-10 flex items-baseline space-x-4 gap-4"> */}
      <ul className="flex ">
        <li className="-mb-px mr-1">
          <Link href="/terminals">
            <a
              className={`bg-white inline-block  rounded-t py-2 px-4  font-semibold ${
                pathname === "/terminals"
                  ? "text-black bg-gray-300"
                  : "text-blue-700"
              }`}
              href="#"
            >
              Terminals Names
            </a>
          </Link>
        </li>
        <li className="mr-1">
          <Link href="/ports">
            <a
              className={`bg-white inline-block  rounded-t py-2 px-4  font-semibold ${
                pathname === "/ports"
                  ? "text-black bg-gray-300"
                  : "text-blue-700"
              }`}
              href="#"
            >
              Ports Names
            </a>
          </Link>
        </li>
        {/* <li className="mr-1">
          <Link href="/rails">
            <a
              className={`bg-white inline-block  rounded-t py-2 px-4  font-semibold ${
                pathname === "/rails"
                  ? "text-black bg-gray-300"
                  : "text-blue-700"
              }`}
              href="#"
            >
              Rails Names
            </a>
          </Link>
        </li> */}
        <li className="mr-1">
          <Link href="/metro_area">
            <a
              className={`bg-white inline-block  rounded-t py-2 px-4  font-semibold ${
                pathname === "/metro_area"
                  ? "text-black bg-gray-300"
                  : "text-blue-700"
              }`}
              href="#"
            >
              Metro Area
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

export default DataNav;
