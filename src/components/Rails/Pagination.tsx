import React, { FC } from "react";
import { Theme } from "../config/theme";
interface Foo {
  postsPerPage: number;
  totalPosts: number;
  paginate: (number: number) => void;
}
const Pagination: FC<Foo> = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      className="container flex justify-center p-2 "
      role="navigation"
      aria-label="pagination"
    >
      <ul className="flex bg-gray-50">
        {pageNumbers.map((number: number) => (
          <li key={number}>
            <a
              className="h-10 px-5 cursor-pointer  text-gray-600 bg-white border  border-gray-600 hover:bg-gray-100"
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
